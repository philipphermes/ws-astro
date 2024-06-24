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
        ws.send('Hi how are you?');
      },
      message(ws, message) {
        ws.send(message);
      },
      close(ws) {
        ws.send('Bye bye!')
      },
    },
  });
  
  console.log(`Listening on ${server.hostname}:${server.port}`);