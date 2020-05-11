import { Character } from '../../character';
import { ReminderToken } from '../../reminder-token';

export class Assassin extends Character {
  constructor() {
    super();
    this.id = 'assassin';
    this.reminderTokens = [
      new ReminderToken('Dead', 'was killed by the Assassin.', this),
      new ReminderToken('Used', 'has used their ability.', this),
    ];
  }
}
