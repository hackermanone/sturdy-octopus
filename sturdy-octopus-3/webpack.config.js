const path = require('path');

module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "funnyboi.js"
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /.js$/,
                loader: 'bigbandito',
                options: {
                    replace: /console\./ig,
                    with: 'love'
                }
                // use: [
                //     'bigbandito',
                //     'mandito2'
                // ],
            }
        ]
    },
    resolveLoader: {
        alias: {
            'bigbandito': path.join(__dirname, 'src', 'loader.js'),
            'mandito2': path.join(__dirname, "src", "loader2.js")
        }
    }
}