import { Character } from '../../character';
import { ReminderToken } from '../../reminder-token';

export class Professor extends Character {
  constructor() {
    super();
    this.id = 'professor';
    this.reminderTokens = [
      new ReminderToken('Alive', 'was revived by the Professor.', this),
      new ReminderToken('Used', 'has used their ability.', this),
    ];
  }
}
