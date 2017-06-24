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
  'fa fa-microchip',
  'fa fa-snowflake-o',
  'fa fa-cloud',
  'fa fa-briefcase',
  'fa fa-calculator',
  'fa fa-camera-retro',
  'fa fa-motorcycle',
  'fa fa-rocket',
  'fa fa-smile-o',
  'fa fa-space-shuttle',
  'fa fa-umbrella',
  'fa fa-tree',
  'fa fa-star',
  'fa fa-paper-plane',
  'fa fa-music',
  'fa fa-moon-o',
  'fa fa-square',
  'fa fa-suitcase',
  'fa fa-trophy',
  'fa fa-bicycle',
  'fa fa-scissors',
  'fa fa-floppy-o',
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
    if (iconsNeeded > icons.length) {
      return false;
    }

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
        covered: true,
        matched: false,
      };
    }
    return tiles;
  }

  handleClick(i) {
    console.log(`handleClick: ${i}`);
    const newTiles = this.state.tiles.slice();
    // console.log(newTiles);
    newTiles[i].covered = !(newTiles[i].covered);
    this.setState({ tiles: newTiles });
    return false;
  }

  tileRender(key, ind) {
    return (
      <Tile
        key={key}
        tileIndex={ind}
        tileState={this.state.tiles[ind]}
        onClick={() => this.handleClick(ind)}
      />
    );
  }

  render() {
    const board = [];
    let tileIndex = 0;

    // if sidelength was too long for the amount of tiles
    if (!this.state.tiles) {
      return <div>Sidelength too long</div>
    }

    for (let i = 0; i < this.state.sideLength; i += 1) {
      const row = [];

      for (let j = 0; j < this.state.sideLength; j += 1) {
        row.push(this.tileRender(j, tileIndex));
        tileIndex += 1;
      }
      board.push(<div className="row" key={i}>{row}</div>);
    }

    return (
      <div className="container-fluid">
        {board}
      </div>
    );
  }
}

GameBoard.propTypes = {
  sideLength: PropTypes.number.isRequired,
};

export default GameBoard;
