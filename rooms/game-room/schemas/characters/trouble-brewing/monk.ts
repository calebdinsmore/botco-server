import { Character } from '../../character';
import { CharacterTypeEnum } from '../../enum/character-type.enum';
import { ReminderToken } from '../../reminder-token';

export class Monk extends Character {
  constructor() {
    super();
    this.name = 'Monk';
    this.rulesText = 'Each night*, choose a player (not yourself): they are safe from the Demon tonight.';
    this.image = '/assets/images/characters/tb/Monk.png';
    this.characterType = CharacterTypeEnum.Townsfolk;
    this.reminderTokens = [new ReminderToken('Safe', 'is protected by the Monk.', this)];
  }
}
