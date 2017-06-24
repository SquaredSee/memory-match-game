import React, { Component } from 'react';
import GameBoard from './GameBoard';

class MemoryGame extends Component {
  // Current max sideLength is 8
  render() {
    return (
      <div className="memorygame">
        <GameBoard sideLength={4} />
      </div>
    );
  }
}

export default MemoryGame;
