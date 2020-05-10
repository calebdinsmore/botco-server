import { Character } from '../../character';
import { CharacterTypeEnum } from '../../enum/character-type.enum';

export class Baron extends Character {
  constructor() {
    super();
    this.name = 'Baron';
    this.rulesText = 'There are extra Outsiders in play. [+2 Outsiders]';
    this.image = '/assets/images/characters/tb/Baron.png';
    this.characterType = CharacterTypeEnum.Minion;
  }
}
