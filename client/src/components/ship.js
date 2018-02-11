import React from 'react';
import PropTypes from 'prop-types';

const Ship = ({type, size}) => {
  return (
    <div className={`ship-box ship-box-size-${size} ship-box-${type}`}></div>
  );
};

Ship.propTypes = {
  size: PropTypes.object.isRequired,
};

Ship.defaultProps = {
  size: null,
};

export default Ship;
