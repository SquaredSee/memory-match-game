import React from 'react';
import PropTypes from 'prop-types';

const style = {
  backgroundColor: 'white',
  margin: 5,
  borderStyle: 'solid',
  borderColor: 'black',
  height: 100,
  width: 100,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: 50,
};

const coveredStyle = {
  backgroundColor: 'black',
  margin: 5,
  height: 100,
  width: 100,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: 50,
};

const Tile = (props) => {
  let tile;

  if (props.tileState.covered) {
    const icon = <i />;
    tile = <div className="tile" style={coveredStyle}>{icon}</div>;
  }
  else {
    const icon = <i className={props.tileState.icon} style={style} />;
    tile = <div className="tile" style={style}>{icon}</div>;
  }

  return tile;
};

Tile.propTypes = {
  tileIndex: PropTypes.number.isRequired,
  tileState: PropTypes.shape({
    icon: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    covered: PropTypes.bool.isRequired,
    matched: PropTypes.bool.isRequired,
  }).isRequired,
};
export default Tile;
