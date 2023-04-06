const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
    context: path.join(__dirname, '.'),
    plugins: [
        new CopyWebpackPlugin({
            patterns:[
                { from: 'static', to: './static' }
            ]
        })
    ],
    entry: './server.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "whaletrade.bundle.js"
    },
    target: 'node',
    mode: 'production'
};