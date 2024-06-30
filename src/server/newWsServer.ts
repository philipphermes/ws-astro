import type { SSRManifest } from "astro";

const messages: { message: string, user_id: string }[] = []
let server = undefined

export function start(manifest: SSRManifest) {
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

export function createExports(manifest) {
    const handler = (event, context) => {
        addEventListener('fetch', event => {
            if (server.upgrade(event.request)) {
                return;
            }
            return new Response("Upgrade failed", { status: 500 });
        });

        server.websocket.addEventListener('open', (ws) => {
            ws.subscribe('messages');
            server.publish('messages', JSON.stringify(messages));
        })

        server.websocket.addEventListener('message', (ws, message) => {
            const ms = JSON.parse(message)
            messages.push(ms)

            ws.send(JSON.stringify(messages))
            server.publish('messages', JSON.stringify(messages));
        })

        server.websocket.addEventListener('open', (ws) => {
            ws.unsubscribe('messages')
            console.log('Connection closed')
        })
    };

    return { handler: handler };
}