const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');

const path = require('path');
const context = path.resolve(__dirname, 'src');
function resolve(dir){
    return path.join(__dirname, dir);
}
module.exports = {
    optimization: {
        runtimeChunk: true,
        splitChunks: {
            cacheGroups: {
                commons: {
                    chunks: "initial",
                    minChunks: 2,
                    maxInitialRequests: 5, // The default limit is too small to showcase the effect
                    minSize: 0 // This is example is too small to create commons chunks
                },
                vendor: {
                    test: /node_modules/,
                    chunks: "all",
                    name: "vendor",
                    priority: 10,
                    enforce: true
                }
            }
        }
    },
    devtool: 'eval-source-map',
    output: {
        filename: '[name].[chunkhash].js',
        chunkFilename: '[name].[chunkhash].js',
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                include: path.resolve(__dirname, './src'),
                use: {
                    loader: "babel-loader",
                    query: {
                        plugins: [
                            'transform-react-jsx',
                            'transform-runtime',
                            [
                                'react-css-modules',
                                {
                                    context,
                                    webpackHotModuleReloading:true,
                                    generateScopedName:'[name]__[local]'
                                }
                            ],
                            ["import", { "libraryName": "antd", "libraryDirectory": "es", "style": "css" }]
                        ]
                    }
                }
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader",
                        options: {
                            modules: true,
                            camelCase: true,
                            localIdentName: '[name]__[local]'
                        }
                    }
                ]

            },
            {
                test: /\.css$/,
                include: /node_modules/,
                use: [
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader",
                        options: {
                            modules: false,
                        }
                    }
                ]

            },
            {
                test:/\.less$/,
                loader:'style-loader!css-loader!less-loader' 
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader'
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    'file-loader'
                ]
            },
            {
                test: /\.(csv|tsv)$/,
                use: [
                    'csv-loader'
                ]
            },
            {
                test: /\.xml$/,
                use: [
                    'xml-loader'
                ]
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader",
                        options: { minimize: true }
                    }
                ]
            }
        ]
    },
    devServer: {

        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 8080
      },
      performance: {
          hints: "warning", // 枚举
          maxAssetSize: 30000000, // 整数类型（以字节为单位）
          maxEntrypointSize: 50000000, // 整数类型（以字节为单位）
          assetFilter: function(assetFilename) {
          // 提供资源文件名的断言函数
          return assetFilename.endsWith('.css') || assetFilename.endsWith('.js');
          
          }
      },

     resolve:{
        alias:{
            utils:resolve('src/utils'),
            components:resolve('src/components'),
            actions:resolve('src/actions'),
        }
    },
    plugins: [
        // new CleanWebpackPlugin(['dist']),
        new HtmlWebPackPlugin({
            template: "./src/index.html",
            filename: "index.html"
        }),
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
        })
    ]
};
