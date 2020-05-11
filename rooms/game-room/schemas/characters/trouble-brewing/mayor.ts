import { Character } from '../../character';
import { CharacterTypeEnum } from '../../enum/character-type.enum';

export class Mayor extends Character {
  constructor() {
    super();
    this.id = 'mayor';
  }
}
