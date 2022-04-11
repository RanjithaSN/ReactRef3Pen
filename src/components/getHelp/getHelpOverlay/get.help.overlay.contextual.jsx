import GetHelpOverlay from './get.help.overlay';
import { HelpOverlayPrimaryId, HelpOverlaySubpage } from '../../../redux/getHelp/get.help.selectors';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

const mapStateToProps = createStructuredSelector({
  subpage: HelpOverlaySubpage,
  primaryId: HelpOverlayPrimaryId
});

const mapActionsToProps = {};

export default connect(mapStateToProps, mapActionsToProps)(GetHelpOverlay);
