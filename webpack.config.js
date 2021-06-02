const path = require('path')

module.exports = {
    mode: 'development',
    entry: path.resolve(__dirname, './index.js'),
    output: {
        filename: 'index.js',
        path: '/'
    },
    devServer: {
        contentBase: path.resolve(__dirname, './www'),
        open: true,
        port: '8103'
    }
}