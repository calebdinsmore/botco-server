import { Character } from '../../character';
import { ReminderToken } from '../../reminder-token';

export class Godfather extends Character {
  constructor() {
    super();
    this.id = 'godfather';
    this.reminderTokens = [
      new ReminderToken('Died Today', 'is an Outsider that died today (Godfather).', this),
      new ReminderToken('Dead', 'was killed by the Godfather.', this),
    ];
  }
}
