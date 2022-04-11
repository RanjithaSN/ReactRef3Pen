import path from 'path';
import { core, modules, ui, styledUi } from './paths';

const resolve = {
  extensions: ['.ts', '.tsx', '.js', '.json', '.jsx', '.scss'],
  symlinks: false,
  alias: {
    i18next: path.resolve(modules, 'i18next'),
    'react-i18next': path.resolve(modules, 'react-i18next'),
    'selfcare-core': core,
    'selfcare-ui': ui,
    ui: styledUi
  }
};

export default resolve;
