import { Character } from '../../character';
import { CharacterTypeEnum } from '../../enum/character-type.enum';

export class Mayor extends Character {
  constructor() {
    super();
    this.name = 'Mayor';
    this.rulesText =
      'If only 3 players live & no execution occurs, your team wins. If you die at night, another player might die instead.';
    this.image = '/assets/images/characters/tb/Mayor.png';
    this.characterType = CharacterTypeEnum.Townsfolk;
  }
}
