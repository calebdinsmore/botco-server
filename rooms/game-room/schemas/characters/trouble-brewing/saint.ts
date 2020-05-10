import { Character } from '../../character';
import { CharacterTypeEnum } from '../../enum/character-type.enum';

export class Saint extends Character {
  constructor() {
    super();
    this.name = 'Saint';
    this.rulesText = 'If you die by execution, your team loses.';
    this.image = '/assets/images/characters/tb/Saint.png';
    this.characterType = CharacterTypeEnum.Outsider;
  }
}
