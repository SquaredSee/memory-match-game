import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Tile from './Tile';

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
  const arr = array;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    const index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter -= 1;

    // And swap the last element with it
    const temp = arr[counter];
    arr[counter] = arr[index];
    arr[index] = temp;
  }
  return arr;
}

class GameBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sideLength: props.sideLength,
      resetNext: false, // true if only one card has been selected
      prevTile: {
        index: null,
        icon: null,
      },
      wait: false, // true if waiting for tiles to be re-covered
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
    if (this.state.tiles[i].matched || this.state.wait || !this.state.tiles[i].covered) {
      // Don't do anything if the tile is already matched, is uncovered, or the game is in wait mode
      return false;
    }
    else if (this.state.tiles[i].covered && !this.state.resetNext) {
      // If a single tile has been selected, and the clicked tile is covered
      let newTiles = this.state.tiles.slice();
      newTiles[i].covered = false;

      this.setState(
        {
          resetNext: true,
          prevTile: {
            index: i,
            icon: this.state.tiles[i].icon,
          },
          tiles: newTiles,
        },
      );
    }
    else if (this.state.tiles[i].covered && this.state.resetNext) {
      // if clicked tile is the second one clicked, and it is covered
      let newTiles = this.state.tiles.slice();
      newTiles[i].covered = false;

      this.setState({ resetNext: false, wait: true, tiles: newTiles });

      if (newTiles[i].icon === this.state.prevTile.icon) {
        // if the current and previous tiles match

        // set tiles matched state
        newTiles[i].matched = true;
        newTiles[this.state.prevTile.index].matched = true;

        this.setState({tiles: newTiles, wait: false});
      }
      else {
        // if the current and previous tiles do not match
        setTimeout(() => {
          newTiles = this.state.tiles.slice();

          // set tiles covered state
          newTiles[i].covered = true;
          newTiles[this.state.prevTile.index].covered = true;

          this.setState({wait: false, tiles: newTiles});
        }, 750);  // 750ms timeout
      }
    }
    else {
      return false;
    }

    for (let ind = 0; ind < this.state.tiles.length; ind += 1) {
      if (!this.state.tiles[ind].matched) {
        return false;
      }
    }

    alert('you win!');
    return true;
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
      return <div>Sidelength too long</div>;
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
