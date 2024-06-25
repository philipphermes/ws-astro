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
      open(ws) {
        ws.send(JSON.stringify(messages));
      },
      message(ws, message) {
        if (message == "ping") {
          ws.send("pong")
          return
        }

        messages.push(JSON.parse(message))

        ws.send(JSON.stringify(messages));
      },
      close(ws) {
        ws.send('connection closed!')
      },
    },
  });
  
  console.log(`Listening on ${server.hostname}:${server.port}`);