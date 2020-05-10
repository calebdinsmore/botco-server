import { Character } from '../../character';
import { CharacterTypeEnum } from '../../enum/character-type.enum';

export class Empath extends Character {
  constructor() {
    super();
    this.name = 'Empath';
    this.rulesText = 'Each night, you learn how many of your 2 alive neighbors are evil.';
    this.image = '/assets/images/characters/tb/Empath.png';
    this.characterType = CharacterTypeEnum.Townsfolk;
  }
}
