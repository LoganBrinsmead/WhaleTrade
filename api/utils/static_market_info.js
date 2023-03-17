const exchanges = require('./data/exchanges.json');
const mics = require('./data/mics.json');

// eventually read this info from database
// async function supportedMICS() {
//     return new Promise((resolve, reject) => {
//
//     });
// }
//
// async function supportedExchanges() {
//     return new Promise((resolve, reject) => {
//
//     });
// }
//
// module.exports = {
//     supportedExchanges,
//     supportedMICS
// }

module.exports = {
    exchanges,
    mics
}
