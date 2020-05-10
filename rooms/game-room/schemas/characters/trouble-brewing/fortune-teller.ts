import { Character } from '../../character';
import { CharacterTypeEnum } from '../../enum/character-type.enum';
import { ReminderToken } from '../../reminder-token';

export class FortuneTeller extends Character {
  constructor() {
    super();
    this.name = 'Fortune Teller';
    this.rulesText =
      'Each night, choose 2 players: you learn if either is a Demon. There is 1 good player that registers falsely to you.';
    this.image = '/assets/images/characters/tb/FortuneTeller.png';
    this.characterType = CharacterTypeEnum.Townsfolk;
    this.reminderTokens = [new ReminderToken('Red Herring', "is the Fortune Teller's red herring.", this)];
  }
}
