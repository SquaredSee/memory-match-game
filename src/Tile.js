import React, { Component } from 'react';

const style = {
  backgroundColor: 'white',
  borderStyle: 'solid',
  borderColor: 'black',
  height: 100,
  width: 100,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: 50
}


export default class Tile extends Component {
  render() {
    return (
      <div className="tile" style={style}>
        <i className={this.props.tileState.icon}></i>
      </div>
    );
  }
}
