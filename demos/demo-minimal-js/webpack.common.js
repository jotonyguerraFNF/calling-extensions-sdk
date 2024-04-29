const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: ["./framework.js",
    "./index.js"],
  mode: "development",
  devtool: "source-map", // Specify the type of source map
  plugins: [new HtmlWebpackPlugin({
    template: "./index.html",
    inject: false,
    filename: "demo-minimal-js.html",
  })],
  output: {
    libraryTarget: "umd",
    path: path.resolve(__dirname, "bin"),
    filename: "demo-minimal-js.bundle.js",
    clean: true,
  },
  devServer: {
    https: true,
    port: 443,
    static: {
      directory: path.resolve(__dirname),
    },
    historyApiFallback: {
      index: "index.html",
    },
    // client: {
    //   logging: 'verbose',
    // },
    // devServer: {
    //   host: '0.0.0.0',
    // },
  },
};
