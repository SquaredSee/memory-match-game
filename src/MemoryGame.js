import React, { Component } from 'react';
import GameBoard from './GameBoard';

export default class MemoryGame extends Component {
  render() {
    return (
      <div className="memorygame">
        <GameBoard />
      </div>
    );
  }
}
