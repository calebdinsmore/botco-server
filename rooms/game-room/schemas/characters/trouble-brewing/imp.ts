import { Character } from '../../character';
import { ReminderToken } from '../../reminder-token';

export class Imp extends Character {
  constructor() {
    super();
    this.id = 'imp';
    this.reminderTokens = [new ReminderToken('Dead', 'has been attacked by the Imp.', this)];
  }
}
