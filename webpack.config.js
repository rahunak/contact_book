const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const autoprefixer = require("autoprefixer");

module.exports = {
  entry: "./src/index.js",

  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].bundle.js",
  },
  module: {
    rules: [
      { test: /\.css$/, use: ["style-loader", "css-loader"] },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      { test: /\.(js)$/, use: "babel-loader" },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
      // По каким то причинам autoprefixer вызывает ошибки при компиляции.
      // Ошибки связаны с 5-й версией бутстрапа.
      // {
      //   // Loader for webpack to process CSS with PostCSS
      //   loader: "postcss-loader",
      //   options: {
      //     postcssOptions: {
      //       plugins: [autoprefixer],
      //     },
      //   },
      // },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "./src/components/html/index.html"), // какой файл обрабатываем?
      filename: "index.html", // результат - название выходного файла
    }),
    new CleanWebpackPlugin(),
  ],

  mode: process.env.NODE_ENV === "production" ? "production" : "development",
};
