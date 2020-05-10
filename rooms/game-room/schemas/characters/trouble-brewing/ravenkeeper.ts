import { Character } from '../../character';
import { CharacterTypeEnum } from '../../enum/character-type.enum';

export class Ravenkeeper extends Character {
  constructor() {
    super();
    this.name = 'Ravenkeeper';
    this.rulesText = 'If you die at night, you are woken to choose a player: you learn their character.';
    this.image = '/assets/images/characters/tb/Ravenkeeper.png';
    this.characterType = CharacterTypeEnum.Townsfolk;
  }
}
