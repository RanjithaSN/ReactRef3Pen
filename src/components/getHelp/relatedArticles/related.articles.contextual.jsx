import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { GeneralArticles } from '../../../redux/aws/generalArticles/general.articles.selectors';
import { NavigateInHelp } from '../../../redux/getHelp/get.help.actions';
import RelatedArticles from './related.articles';

const mapStateToProps = createStructuredSelector({
  generalArticles: GeneralArticles
});

const mapActionsToProps = {
  navigateInHelp: NavigateInHelp
};

export default connect(mapStateToProps, mapActionsToProps)(RelatedArticles);
