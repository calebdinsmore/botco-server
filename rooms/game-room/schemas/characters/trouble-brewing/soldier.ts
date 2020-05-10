import { Character } from '../../character';
import { CharacterTypeEnum } from '../../enum/character-type.enum';

export class Soldier extends Character {
  constructor() {
    super();
    this.name = 'Soldier';
    this.rulesText = 'You are safe from the Demon.';
    this.image = '/assets/images/characters/tb/Soldier.png';
    this.characterType = CharacterTypeEnum.Townsfolk;
  }
}
