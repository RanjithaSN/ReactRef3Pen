import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { CategoriesAndTopics } from '../../../redux/aws/categories/categories.selectors';
import { Videos } from '../../../redux/aws/videos/videos.selectors';
import { NavigateInHelp } from '../../../redux/getHelp/get.help.actions';
import ViewVideo from './view.video';

const mapStateToProps = createStructuredSelector({
  categoriesAndTopics: CategoriesAndTopics,
  videos: Videos
});

const mapActionsToProps = {
  navigateInHelp: NavigateInHelp
};

export default connect(mapStateToProps, mapActionsToProps)(ViewVideo);
