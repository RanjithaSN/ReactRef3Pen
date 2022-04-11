import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { CategoriesAndTopics } from '../../../redux/aws/categories/categories.selectors';
import { GeneralArticles } from '../../../redux/aws/generalArticles/general.articles.selectors';
import { NavigateInHelp } from '../../../redux/getHelp/get.help.actions';
import ViewArticle from './view.article';

const mapStateToProps = createStructuredSelector({
  categoriesAndTopics: CategoriesAndTopics,
  generalArticles: GeneralArticles
});

const mapActionsToProps = {
  navigateInHelp: NavigateInHelp
};

export default connect(mapStateToProps, mapActionsToProps)(ViewArticle);
