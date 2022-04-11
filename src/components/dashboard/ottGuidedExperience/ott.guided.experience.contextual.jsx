import { connect } from 'react-redux';
import { UpdateShouldShowOTTGuidedExperience } from '../../../redux/site/site.actions';
import OTTGuidedExperience from './ott.guided.experience';

const mapActionsToProps = {
  updateShouldShowOTTGuidedExperience: UpdateShouldShowOTTGuidedExperience
};

export default connect(null, mapActionsToProps)(OTTGuidedExperience);
