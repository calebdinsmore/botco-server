import { Character } from '../../character';
import { ReminderToken } from '../../reminder-token';

export class TeaLady extends Character {
  constructor() {
    super();
    this.id = 'tealady';
    this.reminderTokens = [
      new ReminderToken('Protected', 'can not die (Tea Lady).', this),
      new ReminderToken('Protected', 'can not die (Tea Lady).', this),
    ];
  }
}
