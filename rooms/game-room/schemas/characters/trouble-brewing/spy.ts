import { Character } from '../../character';
import { CharacterTypeEnum } from '../../enum/character-type.enum';

export class Spy extends Character {
  constructor() {
    super();
    this.name = 'Spy';
    this.rulesText =
      'Each night, you see the Grimoire. You might register as good & as a Townsfolk or Outsider, even if dead.';
    this.image = '/assets/images/characters/tb/Spy.png';
    this.characterType = CharacterTypeEnum.Minion;
  }
}
