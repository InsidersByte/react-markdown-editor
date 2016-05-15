const path = require('path');
const webpack = require('webpack');
const StatsPlugin = require('stats-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: [
        path.resolve(__dirname, 'pages'),
    ],
    output: {
        path: path.join(__dirname, '/dist/'),
        filename: 'bundle.js',
    },
    module: {
        loaders: [
            {
                test: /\.styl$/,
                loader: ExtractTextPlugin.extract('style', ['css', 'postcss', 'stylus']),
            },
            {
                test: /\.jsx?$/,
                loader: 'babel',
                exclude: /node_modules/,
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'pages/index.html',
            inject: 'body',
            filename: 'index.html',
        }),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compressor: {
                warnings: false,
                screw_ie8: true,
            },
        }),
        new StatsPlugin('webpack.stats.json', {
            source: false,
            modules: false,
        }),
        new ExtractTextPlugin('app.css'),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production'),
            },
        }),
    ],
    resolve: {
        extensions: ['', '.js', '.jsx'],
    },
    postcss: () => [autoprefixer],
};
