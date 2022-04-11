import { CurrentSession } from '@selfcare/core/redux/session/session.selectors';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import GetHelpLanding from './get.help.landing';
import { IsCategoriesLoading } from '../../redux/aws/categories/categories.selectors';
import { ShowInaccountHelpList, IsLoadingInaccountList } from '../../redux/getHelp/get.help.selectors';
import { RetrieveFaqs } from '../../redux/aws/faq/faq.actions';
import { GetFaqs, IsFaqsLoading, IsFaqsLoaded } from '../../redux/aws/faq/faq.selectors';
import { OpenLoginModal } from '../../redux/login/login.actions';

const mapStateToProps = createStructuredSelector({
  currentSession: CurrentSession,
  faqs: GetFaqs,
  isCategoriesLoading: IsCategoriesLoading,
  isFaqsLoading: IsFaqsLoading,
  isFaqsLoaded: IsFaqsLoaded,
  showInaccountHelpList: ShowInaccountHelpList,
  isLoadingInaccountList: IsLoadingInaccountList
});
const mapActionsToProps = {
  openLoginModal: OpenLoginModal,
  retrieveFaqs: RetrieveFaqs
};
export default connect(mapStateToProps, mapActionsToProps)(GetHelpLanding);
