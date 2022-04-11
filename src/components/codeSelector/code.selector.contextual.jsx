import { RetrieveCodes } from '@selfcare/core/redux/metadata/codes/codes.actions';
import { SelectOptionsForCodeValues } from '@selfcare/core/redux/metadata/codes/codes.selectors';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import CodeSelector from './code.selector';


const mapStateToProps = createStructuredSelector({
  options: (store, { code }) => SelectOptionsForCodeValues(code, store)
});
const mapActionsToProps = {
  fetchCodes: RetrieveCodes
};

export default connect(mapStateToProps, mapActionsToProps)(CodeSelector);
