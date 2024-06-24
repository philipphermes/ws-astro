const [webSocket, setWebsocket] = useState(null)

useEffect(() => {
    const newSocket = new WebSocket('http://localhost:3000/api/ws')

    newSocket.on

    newSocket.addEventListener('open', (event) => {
        console.log('open')
    })

    newSocket.addEventListener('message', (event) => {});

    newSocket.addEventListener('close', (event) => {
        console.log('close');
    });
})