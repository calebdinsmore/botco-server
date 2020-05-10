import { Character } from '../../character';
import { CharacterTypeEnum } from '../../enum/character-type.enum';
import { ReminderToken } from '../../reminder-token';

export class Undertaker extends Character {
  constructor() {
    super();
    this.name = 'Undertaker';
    this.rulesText = 'Each night, you learn which character died by execution today.';
    this.image = '/assets/images/characters/tb/Undertaker.png';
    this.characterType = CharacterTypeEnum.Townsfolk;
    this.reminderTokens = [new ReminderToken('Dead', 'was executed and will be revealed to the Undertaker.', this)];
  }
}
