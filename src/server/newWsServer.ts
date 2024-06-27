import type { SSRManifest } from "astro";
import type { Server, WebSocketHandler } from "bun";
import { App } from "astro/app";

const messages: { message: string, user_id: string }[] = []
let server = undefined

export function start(manifest: SSRManifest, options) {
    server = Bun.serve<{}>({
        fetch(req, server) {
            if (server.upgrade(req)) {
                return; // do not return a Response
            }
            return new Response("Upgrade failed", { status: 500 });
        },
        websocket: {
            open(ws) {
                ws.subscribe('messages');
                server.publish('messages', JSON.stringify(messages));
            },
            message(ws, message: string) {
                const ms = JSON.parse(message)
                messages.push(ms)
    
                ws.send(JSON.stringify(messages))
                server.publish('messages', JSON.stringify(messages));
            },
            close(ws) {
                console.log(ws);
                ws.unsubscribe('messages')
                console.log('Connection closed')
            },
        },
    });
}

export function createExports(manifest: SSRManifest, options) {
    return {
        async start() {
            return start(manifest, options);
        },
        running() {
            return server !== undefined;
        },
        stop() {
            if (server) {
                server.stop();
                server = undefined;
            }
        },
        handle: handler
    }
}

function handler() {
    return async (req: Request) => {
        if (server.upgrade(req)) {
            return; // do not return a Response
        }
        return new Response("Upgrade failed", { status: 500 });
    };
}