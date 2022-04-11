import { RetrieveCodes } from '@selfcare/core/redux/metadata/codes/codes.actions';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { ChallengeQuestions } from '../../../../redux/createSubscriber/create.subscriber.selectors';
import PasswordChallenge from './password.challenge';


const mapStateToProps = createStructuredSelector({
  passwordChallengeOptions: ChallengeQuestions
});
const mapActionsToProps = {
  retrieveCodes: RetrieveCodes
};

export default connect(mapStateToProps, mapActionsToProps)(PasswordChallenge);
