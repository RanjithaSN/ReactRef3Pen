import loadable from '@loadable/component';

export const AboutPage = loadable(() => import('../aboutPage/about.page.contextual'));
export const Account = loadable(() => import('../account/account.contextual'));
export const AuthenticationLayout = loadable(() => import('../authenticationLayout/authentication.layout'));
export const ForgotPassword = loadable(() => import('../forgotPassword/forgot.password.contextual'));
export const GetHelp = loadable(() => import('../getHelp/get.help.contextual'));
export const LandingPage = loadable(() => import('../landingPage/landing.page.contextual'));
export const LoginModal = loadable(() => import('../login/desktopLogin/login.modal.contextual'), {
  ssr: false
});
export const Login = loadable(() => import('../login/login.contextual'));
export const Logout = loadable(() => import('../logout/logout.contextual'));
export const NotFound = loadable(() => import('../notFound/not.found'));
// I don't know why this works, but it works and I can't remember where I found it, so yeah....
export const PageLayout = loadable(() => import('../pageLayout/page.layout.contextual'), {
  ssr: false
});
export const MetaData = loadable(() => import('../pageMetaData/meta.data.handler.contextual'));
export const PennyPlay = loadable(() => import('../pennyPlay/penny.play'));
export const ResetPassword = loadable(() => import('../resetPassword/reset.password.contextual'));
export const RoamingDetails = loadable(() => import('../roamingDetails/roaming.details.contextual'));
export const Shop = loadable(() => import('../shop/shop.contextual'));
export const StudentLandingPage = loadable(() => import('../studentLandingPage/student.landing.page.contextual.jsx'));
