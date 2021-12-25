const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "production",
  target: "web",
  entry: "./src/ts/index.ts",
  devtool: false,
  output: {
    filename: "[name].js",
    sourceMapFilename: "[file].map[query]",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.(woff|woff2|eot|ttf|otf|svg)$/i,
        generator: {
          filename: "[name][ext]",
        },
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: "ts-loader",
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({ filename: "[name].css" }),
    new HtmlWebpackPlugin({
      template: "./index.html",
      filename: "index.html",
    }),
  ],
  optimization: {
    minimizer: [new CssMinimizerPlugin(), "..."],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "./static"),
      publicPath: "/static",
    },
    port: 9990,
    hot: true,
    historyApiFallback: true,
  },
};
