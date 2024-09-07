const path = require('path');
const BundleTracker = require('webpack-bundle-tracker');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  target: 'web',
  context: path.join(__dirname, '../'),
  entry: {
    project: path.resolve(__dirname, '../','{{cookiecutter.project_slug}}','static','js','project'),
    vendors: path.resolve(__dirname, '../','{{cookiecutter.project_slug}}','static','js','vendors'),
  },
  output: {
    path: path.resolve(
      __dirname,
      '../','{{cookiecutter.project_slug}}','static','webpack_bundles'
    ),
    publicPath: '/static/webpack_bundles/',
    filename: 'js/[name]-[fullhash].js',
    chunkFilename: 'js/[name]-[hash].js',
  },
  plugins: [
    new BundleTracker({
      path: path.resolve(path.join(__dirname, '../')),
      filename: 'webpack-stats.json',
    }),
    new MiniCssExtractPlugin({ filename: 'css/[name].[contenthash].css' }),
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
            },
          },
        ],
      },

      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
      },
      {
        test: /\.s?css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: ['postcss-preset-env', 'autoprefixer', 'pixrem'],
              },
            },
          },
          'sass-loader',
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/,
        type: 'asset/resource',
      },
    ],
  },
  resolve: {
    modules: ['node_modules'],
    extensions: ['.tsx', '.ts', '.js', '.jsx', '...'],
  },
};
