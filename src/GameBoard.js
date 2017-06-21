import React, { Component } from 'react';
import Square from './Square';

const style = {
  gameboard__row: {
    display: 'inline-block'
  }
}

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
]

function getRandom(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }
  return array;
}

export default class GameBoard extends Component {
  constructor() {
    super();
    this.state = {
      sideLength: 4
    }
  }

  render() {
    const icons_needed = this.state.sideLength * this.state.sideLength / 2;
    let chosen_icons = []
    for (let i = 0; i < icons_needed; i++) {
      // keep looping until a new icon is chosen
      let chosen = null
      do {
        let index = getRandom(0, icons.length)
        chosen = icons[index]
      } while (chosen_icons.includes(chosen));
      chosen_icons.push(chosen)
    }

    // need two of each icon
    chosen_icons = chosen_icons.concat(chosen_icons)
    // randomize order
    chosen_icons = shuffle(chosen_icons)


    let board = [];
    for (let i = 0; i < this.state.sideLength; i++) {
      let row = [];
      for (let j = 0; j < this.state.sideLength; j++) {
        row.push(<Square key={j} icon={chosen_icons.pop()} />);
      }
      board.push(<div className="gameboard__row" style={style['gameboard__row']} key={i}>{row}</div>);
    }

    return (
      <div className="gameboard">
        {board}
      </div>
    );
  }
}
