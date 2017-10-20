var path = require('path');
var webpack = require('webpack');

module.exports = {
    context: path.join(__dirname, 'src'),
    entry: './index.js',
    output: { path: path.join(__dirname, 'public/'), filename: 'bundle.js' },
    module: {
        loaders: [
            {
                test: /.jsx?$/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'stage-0', 'react'],
                    plugins: ['babel-plugin-transform-class-properties']
                }
            },
            {
                test: /\.scss$/,
                loader: "style!css!sass"
            }
        ]
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
};