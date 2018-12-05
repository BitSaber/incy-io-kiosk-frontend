/* eslint-env node */
const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
    template: 'src/index.html',
    filename: 'index.html',
    title: 'JS Example Project',
    inject: 'body'
});

const pack = require('./package.json');
const appName = pack.name;
const appVersion = pack.version;
const buildNumber = process.env.BUILD_NUMBER || 'local_dev';
const WebpackShellPlugin = require('webpack-shell-plugin');
const buildsDir = path.resolve(__dirname, 'builds');
const distDir = path.resolve(__dirname, 'dist')
const ENSURE_BUILDS_DIR = 'test -d '+buildsDir+' || mkdir '+buildsDir;
const ENSURE_DIST_DIR = 'test -d '+distDir+' || mkdir '+distDir
const MERGE_ASSET_COMPILE = 'cp -R assets/* '+distDir+' &> /dev/null || :';
const CREATE_ARCHIVE = 'tar czvf '+buildsDir+'/'+appName+'-'+appVersion+'-b'+buildNumber+'.tar.gz'+' -C '+distDir+' .';

module.exports = {
    entry: './src/index.jsx',
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        rules: [
            {
                test: /\.jsx$|\.js$/,
                enforce: 'pre',
                loader: 'eslint-loader',
                include: __dirname+'/src',
                exclude: __dirname+'/node_modules'
            },
            {
                test: /\.jsx$|\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: [
                        '@babel/preset-env',
                        '@babel/preset-react'
                    ]
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                loader: 'url-loader?limit=100000'
            },
            {
                test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url-loader?limit=10000&mimetype=application/font-woff'
            },
            {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url-loader?limit=10000&mimetype=application/octet-stream'
            },
            {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'file-loader'
            },
            {
                test: /\.otf$/,
                loader: 'file-loader'
            },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url-loader?limit=10000&mimetype=image/svg+xml'
            }
        ]
    },
    plugins: [
        HtmlWebpackPluginConfig,
        new WebpackShellPlugin({
            onBuildStart: [ENSURE_BUILDS_DIR, ENSURE_DIST_DIR],
            onBuildExit: [MERGE_ASSET_COMPILE, CREATE_ARCHIVE],
            safe: true
        })
    ],
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
        filename: 'bundle.js'
    }
}
