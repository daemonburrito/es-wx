import React from 'react';
import PropTypes from 'prop-types';

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

export default ProductSelectorNexrad;
