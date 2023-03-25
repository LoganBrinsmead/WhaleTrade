require('dotenv').config();
const ws = require('ws');
// const {subscribeToSymbols} = require("../providers/finnhubws.provider");
const wsPort = process.env.WSPPORT;
// const apiKey = process.env.FINNHUBAPIKEY;


// schema for ws payload
/*
to subscribe to symbols
{
    type: 'subscribe',
    'symbol: [s1, s2, ...],
}
 */
export function startEventServer() {
    const trade_event_server = new ws.WebSocketServer({port: parseInt(wsPort)});
    trade_event_server.on('connection', (ws) => {
        // connect to websocket
        // const client = subscribeToSymbols([],apiKey);
        ws.on('message', (data) => {
            // data = JSON.parse(data.toString());
            console.log(data);
            // if ( data.type === 'subscribe') {
            //     // forward message to finnhub
            //
            // }
            // else {
            //     ws.send('unable to parse message')
            // }
        });
    })
    return trade_event_server;
}

