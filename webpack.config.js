const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const BundleAnalyzerPlugin =
    require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = (env) => {
    return {
        mode: 'production',
        entry: {
            app: path.resolve('src/app.js'),
        },
        output: {
            path: path.resolve(__dirname, 'build'),
            filename: '[name].[contenthash].js',
            clean: true,
            assetModuleFilename: '[file]',
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: 'style.[contenthash].css',
            }),
            new HtmlWebpackPlugin({
                title: 'Learning webpack',
                filename: 'index.html',
                template: path.resolve('src/templates/index.html'),
            }),
            new BundleAnalyzerPlugin(),
        ],
        module: {
            rules: [
                {
                    test: /\.css$/i,
                    use: [MiniCssExtractPlugin.loader, 'css-loader'],
                },
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                [
                                    '@babel/preset-env',
                                    {
                                        debug: false,
                                        useBuiltIns: 'entry',
                                        corejs: '3.27.0',
                                    },
                                ],
                            ],
                        },
                    },
                },
                {
                    test: /\.(png|svg|jpg|jpeg|gif|pdf)$/i,
                    type: 'asset/resource',
                },
            ],
        },
        // devtool: 'source-map',
        devServer: {
            static: {
                directory: path.resolve('build'),
            },
            port: 3000,
            open: true,
            hot: true,
            compress: true,
            historyApiFallback: true,
        },
        optimization: {
            minimizer: [`...`, new CssMinimizerPlugin()],
        },
    };
};
