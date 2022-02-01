const path = require("path");
const slsw = require("serverless-webpack");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: slsw.lib.webpack.isLocal ? "development" : "production",
  optimization: {
    // We no not want to minimize our code at this point.
    minimize: false,
  },
  node: {
    __dirname: false,
  },
  entry: slsw.lib.entries,
  devtool: "source-map",
  resolve: {
    plugins: [new TsconfigPathsPlugin({ configFile: "./tsconfig.json" })],
    alias: {
      "@": path.join(__dirname, "../../lib"),
    },
    extensions: [".json", ".js", ".jsx", ".json", ".ts", ".tsx"],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          // copy the handlebar templates
          from: "message/**/*.hbs",
        },
      ],
    }),
  ],
  output: {
    libraryTarget: "commonjs",
    path: path.join(__dirname, ".webpack"),
    filename: "[name].js",
    sourceMapFilename: "[file].map",
  },
  target: "node",
  module: {
    rules: [
      // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
      {
        test: /\.ts?$/,
        loader: "ts-loader",
        include: [
          __dirname,
          // path.join(__dirname, '../../../src/lib')
        ],
        exclude: /node_modules\/(?!(dhp)\/).*/,
      },
    ],
  },
};
