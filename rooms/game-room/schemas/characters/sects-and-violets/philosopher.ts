import { Character } from '../../character';
import { ReminderToken } from '../../reminder-token';

export class Philosopher extends Character {
  constructor() {
    super();
    this.id = 'philosopher';
    this.reminderTokens = [
      new ReminderToken('Used', 'has used their ability.', this),
      new ReminderToken('Drunk', 'is drunk (via Philosopher).', this),
    ];
  }
}
