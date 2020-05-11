import { Character } from '../../character';
import { ReminderToken } from '../../reminder-token';

export class Tinker extends Character {
  constructor() {
    super();
    this.id = 'tinker';
    this.reminderTokens = [new ReminderToken('Dead', 'has died.', this)];
  }
}
