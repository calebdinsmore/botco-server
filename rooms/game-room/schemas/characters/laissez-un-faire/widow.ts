import { Character } from '../../character';
import { ReminderToken } from '../../reminder-token';

export class Widow extends Character {
  constructor() {
    super();
    this.id = 'widow';
    this.reminderTokens = [
      new ReminderToken('Poisoned', 'has been poisoned.', this),
      new ReminderToken('Knowing', 'knows the Widow is in play.', this),
    ];
  }
}
