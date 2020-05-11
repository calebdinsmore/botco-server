import { Character } from '../../character';
import { CharacterTypeEnum } from '../../enum/character-type.enum';

export class Saint extends Character {
  constructor() {
    super();
    this.id = 'saint';
  }
}
