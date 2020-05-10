import { GameState } from './game-state';
import { Client } from 'colyseus';
import { Schema, type } from '@colyseus/schema';

export class GameMeta extends Schema {
  @type('number')
  playerCount: number = 0;

  @type('number')
  numberOfTownsfolk: number = 0;

  @type('number')
  numberOfOutsiders: number = 0;

  @type('number')
  numberOfMinions: number = 0;

  @type('number')
  numberOfDemons: number = 0;

  updateFromState(state: GameState) {
    this.playerCount = Object.keys(state.players).length;
    if (this.playerCount < 5) return;

    this.numberOfDemons = 1;
    if (this.playerCount < 7) {
      this.numberOfTownsfolk = 3;
      this.numberOfOutsiders = this.playerCount - 5;
      this.numberOfMinions = 1;
    } else if (this.playerCount < 10) {
      this.numberOfTownsfolk = 5;
      this.numberOfOutsiders = (this.playerCount - 7) % 3;
      this.numberOfMinions = 1;
    } else if (this.playerCount < 13) {
      this.numberOfTownsfolk = 7;
      this.numberOfOutsiders = (this.playerCount - 7) % 3;
      this.numberOfMinions = 2;
    } else if (this.playerCount < 16) {
      this.numberOfTownsfolk = 9;
      this.numberOfOutsiders = (this.playerCount - 7) % 3;
      this.numberOfMinions = 3;
    } else if (this.playerCount === 16) {
      this.numberOfTownsfolk = 11;
      this.numberOfOutsiders = 0;
      this.numberOfMinions = 4;
    }
  }
}
