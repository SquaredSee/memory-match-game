import React from 'react';
import PropTypes from 'prop-types';

const darkGray = '#333333';

const style = {
  backgroundColor: 'white',
  borderColor: darkGray,
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
  let icon;
  let styleClone;

  if (props.tileState.covered) {
    styleClone = Object.assign({}, style, { backgroundColor: darkGray });
    icon = <i />;
  }
  else {
    styleClone = Object.assign({}, style, { backgroundColor: 'transparent' });
    icon = <i className={props.tileState.icon} />;
  }

  const tile = (
    <div
      className="tile col-sm-1"
      style={styleClone}
      onClick={props.onClick}
      role="button"
      tabIndex="-1"
    >
      {icon}
    </div>
  );

  return tile;
};

Tile.propTypes = {
  tileIndex: PropTypes.number.isRequired,
  tileState: PropTypes.shape({
    icon: PropTypes.string.isRequired,
    covered: PropTypes.bool.isRequired,
    matched: PropTypes.bool.isRequired,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};
export default Tile;
