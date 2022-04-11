import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Categories, Topics } from '../../../redux/aws/categories/categories.selectors';
import { NavigateInHelp } from '../../../redux/getHelp/get.help.actions';
import ViewCategory from './view.category';

const mapStateToProps = createStructuredSelector({
  categories: Categories,
  topics: Topics
});

const mapActionsToProps = {
  navigateInHelp: NavigateInHelp
};

export default connect(mapStateToProps, mapActionsToProps)(ViewCategory);
