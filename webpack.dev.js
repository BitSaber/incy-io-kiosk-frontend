const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');

let allowRemoteDev = true;

module.exports = merge(common, {
    devServer: {
        contentBase: [
            path.resolve(__dirname, 'assets'),
        ],
        compress: true,
        host: allowRemoteDev ? '0.0.0.0' : 'localhost',
        port: 3000,
        disableHostCheck: allowRemoteDev
    },
    devtool: "cheap-module-source-map",
    mode: 'development'
});
