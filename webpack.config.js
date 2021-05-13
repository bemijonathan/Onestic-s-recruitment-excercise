const webpack = require('webpack');

module.exports = {

    plugins: [
        new webpack.ContextReplacementPlugin(/moment[\\/\\]locale$/, /en|es|fr/),
        // new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
    ]

}
