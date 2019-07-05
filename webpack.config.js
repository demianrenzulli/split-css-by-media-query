const path = require("path");

const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const MediaQueryPlugin = require('media-query-plugin');

module.exports = {
    mode: 'production',
    entry: {
        main: "./src"
    },
    output: {
        path: path.resolve(__dirname, "public"),
        filename: "[name].bundle.js",
    },
    module: {
        rules: [{
                test: /\.(png|jpg|gif)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'img/'
                    }
                }]
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, "css-loader", MediaQueryPlugin.loader, "postcss-loader"]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({ template: "./src/index.html" }),
        new MediaQueryPlugin({ include: ['style'], queries: { '(max-width: 480px)': 'mobile', '(min-width: 481px) and (max-width: 1024px)': 'tablet', '(min-width: 1025px)': 'desktop' }, groups: { main: ['style'] } }),
        new MiniCssExtractPlugin({ filename: "[name].css" })
    ]
}