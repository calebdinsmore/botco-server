import { Character } from '../../character';
import { ReminderToken } from '../../reminder-token';

export class Goblin extends Character {
  constructor() {
    super();
    this.id = 'goblin';
    this.reminderTokens = [new ReminderToken('Claimed Today', 'has claimed that they are the Goblin.', this)];
  }
}
