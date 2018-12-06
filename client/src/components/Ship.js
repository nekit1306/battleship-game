import React from 'react';
import PropTypes from 'prop-types';

const Ship = ({type, data}) => {
    return (
      <div className={`ship-box ship-box-size-${data.size} ship-box-${type} ship-${data.orientation}`}></div>
    );
};

// Ship.propTypes = {
//   type: PropTypes.object.isRequired,
// };
//
// Ship.defaultProps = {
//   size: null,
// };

export default Ship;
