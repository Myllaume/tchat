const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                  loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-react']
                    }
                }
            }
        ]
    },
    mode: 'development',
    devServer: {
        static: {
            directory: path.join(__dirname),
        },
        compress: true,
        port: 9000,
    }
};