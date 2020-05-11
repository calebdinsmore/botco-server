import { Character } from '../../character';
import { ReminderToken } from '../../reminder-token';

export class Butler extends Character {
  constructor() {
    super();
    this.id = 'butler';
    this.reminderTokens = [new ReminderToken('Master', "is the Butler's master", this)];
  }
}
