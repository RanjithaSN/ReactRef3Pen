import { SelectedLocale } from '@selfcare/core/redux/preferences/preferences.selectors';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import RoamingDetails from './roaming.details';

const mapStateToProps = createStructuredSelector({
  locale: SelectedLocale
});

export default connect(mapStateToProps)(RoamingDetails);
