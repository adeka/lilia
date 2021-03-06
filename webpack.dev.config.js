const webpack = require("webpack");
const path = require("path");
const baseConfig = require("./webpack.config.js");

const dotenv = require("dotenv");

const env = dotenv.config({
  path: "./.env",
}).parsed;

const envKeys = Object.keys(env).reduce((prev, next) => {
  return {
    ...prev,
    [next]: JSON.stringify(env[next]),
  };
}, {});

module.exports = {
  ...baseConfig,
  mode: "development",
  module: {
    rules: [...baseConfig.module.rules],
  },
  plugins: [
    ...baseConfig.plugins,
    new webpack.DefinePlugin({
      "process.env": {
        ...envKeys,
      },
    }),
  ],
  devtool: "inline-source-map",
  devServer: {
    contentBase: path.resolve(__dirname, "public/assets"),
    stats: "errors-only",
    open: true,
    port: 8080,
    compress: true,
    historyApiFallback: true,
    // proxy: {
    //   "/cognito_admin": {
    //     target: {
    //       host: "localhost",
    //       protocol: "http:",
    //       port: 3000
    //     }
    //   }
    // }
  },
};
