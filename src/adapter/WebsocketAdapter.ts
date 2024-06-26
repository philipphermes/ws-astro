const messages: {message: string, user_id: string}[] = []

const server = Bun.serve<{}>({
    fetch(req, server) {
        if (req.headers.get("upgrade")?.toLowerCase() === "websocket") {
            server.upgrade(req, {
                data: {
                    createdAt: Date.now(),
                },
            });
        }
        return undefined;
    },
    websocket: {
        sendPings: true,
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
            ws.unsubscribe('messages')
            console.log('Connection closed')
        },
    },
});