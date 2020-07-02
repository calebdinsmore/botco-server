import { Character } from '../../character';
import { ReminderToken } from '../../reminder-token';

export class Cannibal extends Character {
  constructor() {
    super();
    this.id = 'cannibal';
    this.reminderTokens = [
      new ReminderToken('Ability Gained', 'has had their ability stolen.', this),
      new ReminderToken('Poisoned', 'has been poisoned.', this),
    ];
  }
}
