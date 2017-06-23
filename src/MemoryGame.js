import React, { Component } from 'react';
import GameBoard from './GameBoard';

class MemoryGame extends Component {
  render() {
    return (
      <div className="memorygame">
        <GameBoard sideLength={4} />
      </div>
    );
  }
}

export default MemoryGame;
