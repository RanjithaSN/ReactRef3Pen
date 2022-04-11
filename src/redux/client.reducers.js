import account from './account/account.reducer';
import aboutPages from './aws/aboutPages/about.pages.reducer';
import categories from './aws/categories/categories.reducer';
import cloudSearch from './aws/cloudSearch/cloud.search.reducer';
import faq from './aws/faq/faq.reducer';
import campaigns from './aws/campaigns/campaigns.reducer';
import generalArticles from './aws/generalArticles/general.articles.reducer';
import guides from './aws/guides/guides.reducer';
import landingPage from './aws/landingPage/landing.page.reducer';
import version from './aws/version/version.reducer';
import videos from './aws/videos/videos.reducer';
import convergentBiller from './convergentBiller/convergent.biller.reducer';
import createSubscriber from './createSubscriber/create.subscriber.reducer';
import feature from './feature/feature.reducer';
import forgotPassword from './forgotPassword/forgot.password.reducer';
import getHelp from './getHelp/get.help.reducer';
import login from './login/login.reducer';
import loginInfo from './loginInfo/login.info.reducer';
import orderFlow from './orderFlow/order.flow.reducers';
import subscriberInformation from './orderFlow/subscriberInformation/subscriber.information.reducer';
import ordering from './ordering/ordering.reducer';
import paymentInstrumentForm from './paymentInstrument/payment.instrument.form.reducer';
import products from './products/products.reducer';
import progressStepper from './progressStepper/progress.stepper.reducer';
import resetPassword from './resetPassword/reset.password.reducer';
import searchOffers from './searchOffers/search.offers.reducer';
import site from './site/site.reducer';
import supportRequest from './supportRequest/support.request.reducer';
import threeDS from './threeDS/threeDS.reducer';
import troubleshooter from './troubleshooter/troubleshooter.reducer';
import usage from './usage/usage.reducer';
import userInfo from './userInfo/user.info.reducer';
import studentOffer from './studentOffers/studentOffers.reducer';
import inAccountHelp from './inAccountHelp/in.accounthelp.reducer';
import { combineReducers } from 'redux';

export default combineReducers({
  feature,
  aboutPages,
  account,
  campaigns,
  categories,
  cloudSearch,
  convergentBiller,
  createSubscriber,
  faq,
  forgotPassword,
  generalArticles,
  getHelp,
  guides,
  landingPage,
  login,
  loginInfo,
  orderFlow,
  ordering,
  paymentInstrumentForm,
  products,
  progressStepper,
  resetPassword,
  searchOffers,
  site,
  subscriberInformation,
  supportRequest,
  threeDS,
  troubleshooter,
  usage,
  userInfo,
  version,
  videos,
  studentOffer,
  inAccountHelp
});
