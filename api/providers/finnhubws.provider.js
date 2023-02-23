const WebSocket = require('ws');

export function subscribeToSymbols(symbols, apiKey) {

    const socket = new WebSocket(`wss://ws.finnhub.io?token=${apiKey}`);

    socket.on('error', console.error); // maybe log to file?

    socket.on('open', () => {
        symbols.forEach( (sym) => {
            socket.send(JSON.stringify({
                'type': 'subscribe',
                'symbol': sym
            }));
        });
    });

    socket.on('message', (data) => {
        // do something with these trade events
        console.log('trade event: ', JSON.parse(data.toString()));
        // parentPort.postMessage((JSON).parse(data.toString()));
    })

    return socket;
}

