/*
 * @Description: 
 * @Author: xiaoHao
 */
/*
 * @Description: 
 * @Author: xiaoHao
 */
const path = require('path');

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
    
    ]
};