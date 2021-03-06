import { Character } from '../../character';
import { CharacterTypeEnum } from '../../enum/character-type.enum';
import { ReminderToken } from '../../reminder-token';

export class Undertaker extends Character {
  constructor() {
    super();
    this.id = 'undertaker';
    this.reminderTokens = [new ReminderToken('Dead', 'was executed and will be revealed to the Undertaker.', this)];
  }
}
