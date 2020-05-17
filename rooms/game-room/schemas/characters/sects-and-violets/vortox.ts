import { Character } from '../../character';
import { ReminderToken } from '../../reminder-token';

export class Vortox extends Character {
  constructor() {
    super();
    this.id = 'vortox';
    this.reminderTokens = [new ReminderToken('Die', 'dies tonight.', this)];
  }
}
