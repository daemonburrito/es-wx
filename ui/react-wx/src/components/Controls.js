/**
 * Top-Level component for the control panel.
 *
 * Holds react state and handlers. React state is then persisted in redux
 * before processing for display.
 */
import React from 'react';
import PropTypes from 'prop-types';
import withUI from '../containers/hoc/withUI';

const ProductSelectorNexrad = ({ ...props }) =>
  props.knownProducts.length > 0 ? (
    <select id={props.domId} onChange={props.handleChange} value={props.value}>
      {props.knownProducts.map(product => (
        <option value={product.code} key={product.code}>
          {product.productName}
        </option>
      ))}
    </select>
  ) : (
    <span>No product decoders available.</span>
  );

ProductSelectorNexrad.propTypes = {
  knownProducts: PropTypes.array,
  domId: PropTypes.string
};

ProductSelectorNexrad.defaultProps = {
  knownProducts: [],
  domId: ''
};

class Controls extends React.Component {
  constructor(props) {
    super(props);

    this.handleProductSelect = this.handleProductSelect.bind(this);

    this.state = {
      selectedProduct: 0
    };
  }

  handleProductSelect(ev) {
    ev.persist();
    this.setState((prevState, props) => {
      return {
        selectedProduct: ev.target.value
      };
    });
  }

  componentDidUpdate(prevProps) {
    this.props.selectProduct(this.state.selectedProduct);
  }

  render() {
    return (
      <section style={this.props.style}>
        <ProductSelectorNexrad
          knownProducts={this.props.ui.knownProducts}
          value={this.state.selectedProduct}
          handleChange={this.handleProductSelect}
        />
      </section>
    );
  }
}

const defaultStyle = {
  border: '1px solid black'
};

Controls.propTypes = {
  style: PropTypes.object
};

Controls.defaultProps = {
  style: defaultStyle
};

export default withUI(Controls);
