/*
 * @Description: 
 * @Author: xiaoHao
 */
const path = require('path');
// const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
    entry: './src/main.js',
    module: {
        rules: [{
            test: /\.(png|svg|jpg|gif|gltf|glb|obj)(\?.*)$/,
            loder: 'url-loader',

        },
        {
            test: /\.(mtl|obj)$/,
            use:
                [
                    {
                        loader: 'file-loader',

                    }
                ]
        }],
    },
    resolve: {
        alias: {
            "~": path.resolve(__dirname, 'public'),
        },
    },
    contentBase: false,
    plugins:[
        // new CopyWebpackPlugin([
        //     {
        //       from: path.resolve(__dirname, './static'),
        //       to: 'public',
        //       ignore: ['.*']
        //     }
        //   ])
    ]
};