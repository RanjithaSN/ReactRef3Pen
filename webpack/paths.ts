import path from 'path';

const languageDirectoryPath = ['src', 'locales', 'languages'];
const consentDirectoryPath = ['src', 'locales', 'consentPolicies'];

export const root = path.resolve('.');
export const modules = path.resolve(root, 'node_modules');
export const selfcareSrc = path.resolve(root, 'src');
export const core = path.resolve(__dirname, '../src/selfcare-core');
export const ui = path.resolve(__dirname, '../src/selfcare-ui');
export const consents = path.resolve(root, ...consentDirectoryPath);
export const dist = path.resolve(root, 'dist');
export const distClient = path.resolve(root, 'dist', 'client');
export const distServer = path.resolve(root, 'dist', 'server');
export const distWidget = path.resolve(root, 'dist-widget');
export const polyfills = path.resolve(root, 'config', 'polyfills.js');
export const selfcareLanguages = path.resolve(root, ...languageDirectoryPath);
export const selfcareCoreLanguages = path.resolve(core, ...languageDirectoryPath);
export const selfcareUiLanguages = path.resolve(ui, ...languageDirectoryPath);
export const styledUi = path.resolve(__dirname, '../src/ui');
