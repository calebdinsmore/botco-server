import { Character } from '../../character';
import { ReminderToken } from '../../reminder-token';

export class NoDashii extends Character {
  constructor() {
    super();
    this.id = 'nodashii';
    this.reminderTokens = [
      new ReminderToken('Die', 'dies tonight.', this),
      new ReminderToken('Poisoned', 'is poisoned (No Dashii)', this),
      new ReminderToken('Poisoned', 'is poisoned (No Dashii)', this),
    ];
  }
}
