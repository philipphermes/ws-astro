const messages: {message: string, user_id: string}[] = []

const server = Bun.serve<{}>({
    port: 4322,
    fetch(req, server) {
        // upgrade the request to a WebSocket
        if (server.upgrade(req)) {
          return; // do not return a Response
        }
        return new Response("Upgrade failed", { status: 500 });
    },
    websocket: {
        open(ws) {
            ws.subscribe('messages');
            ws.send(JSON.stringify(messages));
        },
        message(ws, message: string) {
            const ms = JSON.parse(message)
            messages.push(ms)

            ws.send(JSON.stringify(messages))
            ws.publish('messages', JSON.stringify(messages))
        },
        close(ws) {
            console.log(ws);
            ws.unsubscribe('messages')
            console.log('Connection closed')
        },
    },
});
