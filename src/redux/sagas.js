import { watchRetrieveBenefitsConfigAsync } from '@selfcare/core/redux/benefits/benefits.actions';
import { watchRetrieveConfigurationAsync } from '@selfcare/core/redux/configuration/configuration.actions';
import codesSagas from '@selfcare/core/redux/metadata/codes/codes.sagas';
import offeringSagas from '@selfcare/core/redux/metadata/offerings/offerings.sagas';
import { sagaHelperWatcher } from '@selfcare/core/redux/utils/cdn.sagas';
import appLoadedSaga from './appLoaded/app.loaded.sagas';
import orderingSagas from './ordering/ordering.sagas';

const createRootTasks = () => [
  appLoadedSaga,
  watchRetrieveConfigurationAsync,
  watchRetrieveBenefitsConfigAsync,
  sagaHelperWatcher,
  offeringSagas,
  codesSagas,
  orderingSagas
];

export default createRootTasks;
