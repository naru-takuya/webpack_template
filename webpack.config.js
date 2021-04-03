const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  // 開発環境はdevelopment
  mode: 'development',
  // mode: 'production',
  // 任意の場所にエントリーポイント作成
  entry: './src/js/app.js',
  // どこにバンドルしたファイルを出力するか
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'js/bundle.js',
  },
  module: {
    rules: [
      {
        test: /style\.scss$/i, 
        use: [
          { loader: MiniCssExtractPlugin.loader },
          { loader: 'css-loader' },
          {
            loader: 'postcss-loader',
            options: { 
              postcssOptions: {
                plugins: [ 
                  require('postcss-nested'),
                  require('autoprefixer')
                ] 
              },
            },
          },
          { 
            loader: 'sass-loader',
            options: {
              sassOptions: {
                outputStyle: 'expanded',
              },  
            },
          },
          {
            loader: 'import-glob-loader',
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
        ],
      },
      {
        test: /\.(gif|png|jpe?g|JPG|)$/,
        use: 'url-loader'
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/style.css',
      ignoreOrder: true,
    })
  ]
};

