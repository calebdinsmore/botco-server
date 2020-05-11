import { Character } from '../../character';
import { ReminderToken } from '../../reminder-token';

export class Goon extends Character {
  constructor() {
    super();
    this.id = 'goon';
    this.reminderTokens = [new ReminderToken('Drunk', 'is drunk (Goon).', this)];
  }
}
