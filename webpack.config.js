const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");

module.exports = {
  context: path.resolve(__dirname, "src"),
  entry: "./index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist")
  },
  resolve: {
    alias: {
      Styles: path.resolve(__dirname, "src/styles/"),
      Assets: path.resolve(__dirname, "src/assets/"),
      JS: path.resolve(__dirname, "src/js/"),
      Client: path.resolve(__dirname, "src/js/client/"),
      Components: path.resolve(__dirname, "src/js/components/"),
      Icons: path.resolve(__dirname, "src/icons/"),
      Styles: path.resolve(__dirname, "src/styles/")
    }
  },
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: ["style-loader", "css-loader", "sass-loader"]
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.(jpg|jpeg|ico|png|gif|svg)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "./assets/"
            }
          }
        ]
      },
      {
        test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "fonts/"
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      favicon: "./assets/favicon.ico",
      template: "index.html"
    }),
    new CleanWebpackPlugin(["dist"])
  ]
};
