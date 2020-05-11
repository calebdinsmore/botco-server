import { Character } from '../../character';
import { ReminderToken } from '../../reminder-token';

export class Zombuul extends Character {
  constructor() {
    super();
    this.id = 'zombuul';
    this.reminderTokens = [
      new ReminderToken('No Death Today', 'will act tonight.', this),
      new ReminderToken('Dead', 'was killed by the Zombuul.', this),
    ];
  }
}
