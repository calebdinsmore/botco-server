import { TroubleBrewingSet } from './characters/sets/trouble-brewing-set';
import { CharacterSet } from './characters/character-set';
import { BadMoonRisingSet } from './characters/sets/bad-moon-rising-set';
import { SectsAndVioletsSet } from './characters/sets/sects-and-violets-set';

export class StaticGameData {
  characterSets: CharacterSet[];

  constructor() {
    this.characterSets = [new TroubleBrewingSet(), new BadMoonRisingSet(), new SectsAndVioletsSet()];
  }
}
