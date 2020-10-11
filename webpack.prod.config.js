const baseConfig = require("./webpack.config.js");
// const ExtractCssChunks = require("extract-css-chunks-webpack-plugin");
const webpack = require("webpack");

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
  mode: "production",
  module: {
    rules: [...baseConfig.module.rules],
  },
  plugins: [
    ...baseConfig.plugins,
    new webpack.DefinePlugin({
      "process.env": {
        production: true,
        ...envKeys,
      },
    }),
  ],
  output: {
    filename: "[name].[contenthash].js",
  },
};
