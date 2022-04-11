import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Categories, Topics } from '../../../redux/aws/categories/categories.selectors';
import { ArticlesForSubscriberLevel } from '../../../redux/aws/topics/topics.selectors';
import { NavigateInHelp } from '../../../redux/getHelp/get.help.actions';
import ViewTopic from './view.topic';

const mapStateToProps = createStructuredSelector({
  articles: ArticlesForSubscriberLevel,
  categories: Categories,
  topics: Topics
});

const mapActionsToProps = {
  navigateInHelp: NavigateInHelp
};

export default connect(mapStateToProps, mapActionsToProps)(ViewTopic);
