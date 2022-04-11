import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { RetrieveCategories } from '../../../redux/aws/categories/categories.actions';
import { Categories } from '../../../redux/aws/categories/categories.selectors';
import { NavigateInHelp } from '../../../redux/getHelp/get.help.actions';
import GetHelpCategories from './get.help.categories';

const mapStateToProps = createStructuredSelector({
  categories: Categories
});

const mapActionsToProps = {
  navigateInHelp: NavigateInHelp,
  retrieveCategories: RetrieveCategories
};

export default connect(mapStateToProps, mapActionsToProps)(GetHelpCategories);
