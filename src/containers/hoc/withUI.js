// Generic UI state
import { connect } from 'react-redux';
import { compose, setDisplayName } from 'recompose';
import { selectProduct } from '../../actions/control';
import { uiSelector } from '../../selectors/ui';

const withUI = compose(
  setDisplayName('withUI'),
  connect(
    state => ({ ui: uiSelector(state) }),
    dispatch => {
      return {
        selectProduct: productCode => dispatch(selectProduct(productCode))
      };
    }
  )
);

export default withUI;
