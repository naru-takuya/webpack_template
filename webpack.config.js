const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const ImageminPlugin = require("imagemin-webpack-plugin").default;
const ImageminMozjpeg = require("imagemin-mozjpeg");

module.exports = {
  // 開発環境はdevelopment
  mode: "development",
  // 任意の場所にエントリーポイント作成
  entry: "./src/js/app.js",
  // どこにバンドルしたファイルを出力するか
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "js/bundle.js",
  },
  devServer: {
    contentBase: path.resolve(__dirname, "public"),
  },
  module: {
    rules: [
      {
        test: /\.scss$/i,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          { loader: "css-loader" },
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [require("postcss-nested"), require("autoprefixer")],
              },
            },
          },
          {
            loader: "sass-loader",
            options: {
              sassOptions: {
                outputStyle: "expanded",
              },
            },
          },
          {
            loader: "import-glob-loader",
          },
        ],
      },
      {
        test: /\.css$/,
        use: [{ loader: "style-loader" }, { loader: "css-loader" }],
      },
      {
        test: /\.(gif|png|jpe?g|JPG)$/,
        use: [{ loader: "url-loader" }],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 10000,
              fallback: "file-loader",
              name: "../font/[name].[ext]",
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/style.css",
      ignoreOrder: true,
    }),
    // new CopyPlugin({
    //   patterns: [
    //     {
    //       from: "src/img/",
    //       to: "img/",
    //     },
    //     {
    //       from: "src/font/",
    //       to: "font/",
    //     },
    //   ],
    // }),
    // new ImageminPlugin({
    //   test: /\.(jpe?g|png|gif|svg)$/i,
    //   pngquant: {
    //     quality: "65-80",
    //   },
    //   gifsicle: {
    //     interlaced: false,
    //     optimizationLevel: 1,
    //     colors: 256,
    //   },
    //   svgo: {},
    //   plugins: [
    //     ImageminMozjpeg({
    //       quality: 50,
    //       progressive: true,
    //     }),
    //   ],
    // }),
  ],
};
