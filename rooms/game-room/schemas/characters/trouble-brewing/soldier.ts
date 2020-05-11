import { Character } from '../../character';
import { CharacterTypeEnum } from '../../enum/character-type.enum';

export class Soldier extends Character {
  constructor() {
    super();
    this.id = 'soldier';
  }
}
