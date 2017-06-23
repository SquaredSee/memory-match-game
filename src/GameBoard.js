import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Tile from './Tile';

const style = {
  gameboard__row: {
    display: 'inline-block',
  },
};

const icons = [
  'fa fa-futbol-o',
  'fa fa-fire',
  'fa fa-hand-spock-o',
  'fa fa-gamepad',
  'fa fa-eye',
  'fa fa-diamond',
  'fa fa-leaf',
  'fa fa-key',
  'fa fa-plane',
  'fa fa-anchor',
  'fa fa-car',
  'fa fa-book',
  'fa fa-bolt',
  'fa fa-circle-o',
  'fa fa-coffee',
  'fa fa-heart',
];

function getRandom(min, max) {
  const rmin = Math.ceil(min);
  const rmax = Math.floor(max);
  return Math.floor(Math.random() * (rmax - rmin)) + rmin;
}

function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    const index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter -= 1;

    // And swap the last element with it
    const temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }
  return array;
}

class GameBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sideLength: props.sideLength,
      tiles: this.initTiles(props.sideLength),
    };
  }

  initTiles(sideLength) {
    const iconsNeeded = (sideLength * sideLength) / 2;
    let chosenIcons = [];

    for (let i = 0; i < iconsNeeded; i += 1) {
      // keep looping until a new icon is chosen
      let chosen = null;

      do {
        const index = getRandom(0, icons.length);
        chosen = icons[index];
      } while (chosenIcons.includes(chosen));

      chosenIcons.push(chosen);
    }

    // need two of each icon
    chosenIcons = chosenIcons.concat(chosenIcons);
    // randomize order of icons
    chosenIcons = shuffle(chosenIcons);

    const tiles = new Array(sideLength * sideLength);
    for (let i = 0; i < tiles.length; i += 1) {
      tiles[i] = {
        icon: chosenIcons.pop(),
        color: 'white', // TODO: different color for each uncovered tile
        covered: true,
        matched: false,
      };
    }
    return tiles;
  }

  render() {
    const board = [];
    let tileIndex = 0;

    for (let i = 0; i < this.state.sideLength; i += 1) {
      const row = [];
      for (let j = 0; j < this.state.sideLength; j += 1) {
        row.push(
          <Tile
            key={j}
            tileIndex={tileIndex}
            tileState={this.state.tiles[tileIndex]}
          />,
        );
        tileIndex += 1;
      }
      board.push(<div className="gameboard__row" style={style.gameboard__row} key={i}>{row}</div>);
    }

    return (
      <div className="gameboard">
        {board}
      </div>
    );
  }
}

GameBoard.propTypes = {
  sideLength: PropTypes.number.isRequired,
};

export default GameBoard;
