// This HOC is the bridge to the Decoder API
// Components using this get access to the product decode queue and action
// creators for starting decoder runs.
import { connect } from 'react-redux';
import { compose, setDisplayName } from 'recompose';

const withDecoders = compose(
  setDisplayName('withDecoders'),
  connect(
    state => ({}),
    dispatch => ({})
  )
);

export default withDecoders;
