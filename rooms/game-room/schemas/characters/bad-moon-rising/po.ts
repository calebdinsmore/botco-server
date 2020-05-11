import { Character } from '../../character';
import { ReminderToken } from '../../reminder-token';

export class Po extends Character {
  constructor() {
    super();
    this.id = 'po';
    this.reminderTokens = [
      new ReminderToken('Dead (1)', 'was killed by Po.', this),
      new ReminderToken('Dead (2)', 'was killed by Po.', this),
      new ReminderToken('Dead (3)', 'was killed by Po.', this),
      new ReminderToken('Attack x3', 'will attack 3 times tomorrow night.', this),
    ];
  }
}
