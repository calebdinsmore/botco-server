import { Character } from '../../character';
import { ReminderToken } from '../../reminder-token';

export class EvilTwin extends Character {
  constructor() {
    super();
    this.id = 'eviltwin';
    this.reminderTokens = [new ReminderToken('Twin', "is the Evil Twin's twin.", this)];
  }
}
