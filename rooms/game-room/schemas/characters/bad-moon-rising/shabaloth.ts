import { Character } from '../../character';
import { ReminderToken } from '../../reminder-token';

export class Shabaloth extends Character {
  constructor() {
    super();
    this.id = 'shabaloth';
    this.reminderTokens = [
      new ReminderToken('Dead (1)', 'was killed by the Shabaloth.', this),
      new ReminderToken('Dead (2)', 'was killed by the Shabaloth.', this),
      new ReminderToken('Alive', 'was regurgitated by the Shabaloth.', this),
    ];
  }
}
