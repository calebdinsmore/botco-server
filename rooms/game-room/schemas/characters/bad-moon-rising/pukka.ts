import { Character } from '../../character';
import { ReminderToken } from '../../reminder-token';

export class Pukka extends Character {
  constructor() {
    super();
    this.id = 'pukka';
    this.reminderTokens = [
      new ReminderToken('Poisoned', 'is poisoned (Pukka).', this),
      new ReminderToken('Dead', 'was killed by Pukka.', this),
    ];
  }
}
