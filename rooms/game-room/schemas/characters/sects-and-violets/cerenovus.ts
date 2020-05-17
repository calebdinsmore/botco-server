import { Character } from '../../character';
import { ReminderToken } from '../../reminder-token';

export class Cerenovus extends Character {
  constructor() {
    super();
    this.id = 'cerenovus';
    this.reminderTokens = [new ReminderToken('Mad', 'is mad about their character (via Cerenovus).', this)];
  }
}
