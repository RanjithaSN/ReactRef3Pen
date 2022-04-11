import autoprefixer from 'autoprefixer';
import CssNano from 'cssnano';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { selfcareSrc, ui } from './paths';

const babelLoader = {
  loader: 'babel-loader',
  options: {
    babelrc: true,
    compact: false
  }
};

export const tsx = {
  test: /\.tsx?$/,
  use: [babelLoader]
};

export const jsx = {
  test: /\.(js|jsx)$/,
  use: [babelLoader]
};

export const images = {
  test: /\.(gif|jpg|png|svg|webp)$/,
  include: [selfcareSrc, ui],
  loader: 'file-loader',
  options: {
    name: '[path][name].[hash:8].[ext]',
    publicPath: '/static'
  }
};

export const font = {
  test: /\.woff(2)?$/,
  use: 'url-loader'
};

export function scss(isProd: boolean) {
  return {
    test: /\.scss$/,
    use: [
      {
        loader: isProd ? MiniCssExtractPlugin.loader : 'style-loader'
      },
      {
        loader: 'css-loader',
        options: {
          sourceMap: true
        }
      },
      {
        loader: 'postcss-loader',
        options: {
          sourceMap: true,
          plugins: () => {
            return isProd ? [
              autoprefixer({
                grid: 'autoplace'
              }),
              CssNano({
                preset: 'default'
              })
            ] : [
              autoprefixer({
                grid: 'autoplace'
              })
            ];
          }
        }
      },
      {
        loader: 'resolve-url-loader'
      },
      {
        loader: 'sass-loader',
        options: {
          sourceMap: true,
          outputStyle: 'expanded'
        }
      }
    ]
  };
}
