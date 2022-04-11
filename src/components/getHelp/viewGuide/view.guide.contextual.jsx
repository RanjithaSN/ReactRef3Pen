import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { CategoriesAndTopics } from '../../../redux/aws/categories/categories.selectors';
import { Guides } from '../../../redux/aws/guides/guides.selectors';
import { NavigateInHelp } from '../../../redux/getHelp/get.help.actions';
import ViewGuide from './view.guide';

const mapStateToProps = createStructuredSelector({
  categoriesAndTopics: CategoriesAndTopics,
  guides: Guides
});

const mapActionsToProps = {
  navigateInHelp: NavigateInHelp
};

export default connect(mapStateToProps, mapActionsToProps)(ViewGuide);
