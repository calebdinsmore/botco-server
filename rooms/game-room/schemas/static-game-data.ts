import { TroubleBrewingSet } from './characters/sets/trouble-brewing-set';
import { CharacterSet } from './characters/character-set';

export class StaticGameData {
  characterSets: CharacterSet[];

  constructor() {
    this.characterSets = [new TroubleBrewingSet()];
  }
}
