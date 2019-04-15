import React from 'react';

const Ship = ({type, data}) => (
    <div className={`ship-box ship-box-size-${data.size} ship-box-${type} ship-${data.orientation}`}></div>
);

// Ship.propTypes = {
//   type: PropTypes.object.isRequired,
// };
//
// Ship.defaultProps = {
//   size: null,
// };

export default Ship;
