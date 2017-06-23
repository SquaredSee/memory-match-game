import React from 'react';
import PropTypes from 'prop-types';

const style = {
  backgroundColor: 'white',
  borderStyle: 'solid',
  borderColor: 'black',
  height: 100,
  width: 100,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: 50,
};

const Tile = (props) => {
  return (
    <div className="tile" style={style}>
      <i className={props.tileState.icon} />
    </div>
  );
};
Tile.propTypes = {
  tileIndex: PropTypes.number.isRequired,
  tileState: PropTypes.shape({
    icon: PropTypes.string,
    covered: PropTypes.bool,
    matched: PropTypes.bool,
  }).isRequired,
};
export default Tile;
