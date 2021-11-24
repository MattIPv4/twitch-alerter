const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = env => ({
    // Set the webpack mode
    mode: env.production ? 'production' : 'development',
    // Use the main source for production builds, use the dev script for development
    entry: path.join(__dirname, env.production ? 'src' : 'dev', 'index.js'),
    // Set our output to always be dist/main.js
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
        // Ensure the exports are preserved for production
        library: env.production ? { name: 'twitchAlerter', type: 'umd' } : undefined,
    },
    // Load the html plugin when in development
    plugins: [
        !env.production && new HtmlWebpackPlugin({ /*template: path.join(__dirname, 'dev', 'index.html')*/ }),
    ].filter(x => !!x),
    // Include source maps when in development
    devtool: !env.production && 'inline-source-map',
});
