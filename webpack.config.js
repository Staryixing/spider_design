const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const htmlWebpackPlugin = new HtmlWebpackPlugin({
 template: path.join(__dirname, "example/index.html"),
 filename: "./index.html"
});
module.exports = {
  entry: path.join(__dirname, "example/index.js"),
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      use: "babel-loader",
      exclude: /node_modules/
    },{
      test: /\.css$/,
      exclude: [/node_modules/],
      use: ["style-loader", "css-loader"]
    },{
      test: /\.(ts|tsx)$/,
      use: ["babel-loader","awesome-typescript-loader"],
      exclude: [/node_modules/],
    },{
      test: /\.less$/,
      exclude: [/node_modules/],
      use: [
        require.resolve('style-loader'),
        {
          loader: require.resolve('css-loader'),
          options: {
            importLoaders: 1,
            modules: true,
            localIdentName:"[name]__[local]___[hash:base64:5]"
          }
        },{
          loader: require.resolve('less-loader')
        }
      ]
    }]
  },
  plugins: [htmlWebpackPlugin],
  resolve: {
    extensions: [".js", ".jsx",".tsx",".ts"]
  },
  devServer: {
    port: 3001
}};