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


export default class Square extends Component {
  render() {
    console.log(this.props)
    return (
      <div className="square" style={style}><i className={this.props.icon}></i></div>
    );
  }
}
