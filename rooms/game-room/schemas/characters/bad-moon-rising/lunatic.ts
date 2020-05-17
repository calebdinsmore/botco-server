import { Character } from '../../character';
import { ReminderToken } from '../../reminder-token';

export class Lunatic extends Character {
  constructor() {
    super();
    this.id = 'lunatic';
    this.reminderTokens = [
      new ReminderToken('Attack 1', 'was attacked 1st by the Lunatic.', this),
      new ReminderToken('Attack 2', 'was attacked 2nd by the Lunatic.', this),
      new ReminderToken('Attack 3', 'was attacked 3rd by the Lunatic.', this),
      new ReminderToken('Decoy', 'is a decoy Minion (Lunatic)', this, true),
    ];
  }
}
