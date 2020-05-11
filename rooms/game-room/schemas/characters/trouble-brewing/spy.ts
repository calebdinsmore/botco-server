import { Character } from '../../character';
import { CharacterTypeEnum } from '../../enum/character-type.enum';

export class Spy extends Character {
  constructor() {
    super();
    this.id = 'spy';
  }
}
