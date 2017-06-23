import React from 'react';
import PropTypes from 'prop-types';

const style = {
  backgroundColor: 'white',
  borderColor: 'black',
  borderStyle: 'solid',
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
    style.backgroundColor = 'black';
    const icon = <i />;
    tile = <div className="tile" style={style}>{icon}</div>;
  }
  else {
    style.backgroundColor = props.tileState.color;
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
