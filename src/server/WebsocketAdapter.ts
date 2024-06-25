const messages = []

const server = Bun.serve<{}>({
    fetch(req, server) {
        server.upgrade(req, {
          data: {
            createdAt: Date.now(),
          },
        });
    
        return undefined;
      },
    websocket: {
      sendPings: true,
      open(ws) {
        ws.send(JSON.stringify(messages));
      },
      message(ws, message) {
        const ms = JSON.parse(message)

        if (ms.user_id == "client-ping") {
          ws.send(JSON.stringify(messages))
          return
        }

        messages.push(ms)
        ws.send(JSON.stringify(messages));
      },
      close(ws) {
        ws.send('connection closed!')
      },
    },
  });
  
  console.log(`Listening on ${server.hostname}:${server.port}`);