import CopyWebpackPlugin from 'copy-webpack-plugin';
import fs from 'fs';
import hashFiles from 'hash-files';
import path from 'path';
import webpack from 'webpack';
import PWAManifest from 'webpack-pwa-manifest';
import {
  selfcareCoreLanguages,
  selfcareLanguages,
  selfcareUiLanguages
} from './paths';

export const manifestPlugin = new PWAManifest({
  background_color: '#000000',
  theme_color: '#e4002b',
  crossorigin: undefined,
  display: 'standalone',
  fingerprints: true,
  icons: [
    {
      sizes: [36, 48, 72, 96, 144, 192, 512],
      src: path.resolve('src/favicon.png')
    },
    {
      size: '1024x1024',
      src: path.resolve('src/favicon.png'),
      // @ts-ignore
      purpose: 'maskable'
    }
  ],
  // @ts-ignore
  gcm_sender_id: '194046100314',
  inject: true,
  ios: false,
  name: 'Penny',
  publicPath: '/static',
  start_url: '/om/penny'
});

const languagesMap: { [k: string]: string[] } = {
  app: getLocaleFiles(selfcareLanguages),
  core: getLocaleFiles(selfcareCoreLanguages),
  ui: getLocaleFiles(selfcareUiLanguages)
};

const metadata: { context: string, file: string }[] = Object.keys(languagesMap).reduce((result, context) => (
  result.concat(languagesMap[context].map((file: string) => ({
    context,
    file
  })))
), []);

const LOCALE_HASH = hashFiles.sync({
  files: metadata.map((entry) => entry.file),
  algorithm: 'md5'
});

function getLocaleFiles(localePath: string) {
  return fs.readdirSync(localePath).map((filename) => {
    return path.resolve(localePath, filename);
  });
}

export function localeDefinePlugin() {
  return new webpack.DefinePlugin({
    LOCALE_HASH: JSON.stringify(LOCALE_HASH)
  });
}

export function localeCopyPlugin() {
  // @ts-ignore
  return new CopyWebpackPlugin({
    patterns: metadata.map((entry) => ({
      from: entry.file,
      to: `locales/${LOCALE_HASH}/${entry.context}`,
      flatten: true
    }))
  });
}
