import { Character } from '../../character';
import { CharacterTypeEnum } from '../../enum/character-type.enum';

export class Chef extends Character {
  constructor() {
    super();
    this.id = 'chef';
  }
}
