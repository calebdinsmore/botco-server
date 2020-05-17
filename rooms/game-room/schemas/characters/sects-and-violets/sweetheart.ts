import { Character } from '../../character';
import { ReminderToken } from '../../reminder-token';

export class Sweetheart extends Character {
  constructor() {
    super();
    this.id = 'sweetheart';
    this.reminderTokens = [new ReminderToken('Drunk', 'is drunk (via Sweetheart).', this)];
  }
}
