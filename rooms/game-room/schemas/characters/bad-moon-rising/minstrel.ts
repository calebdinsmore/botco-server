import { Character } from '../../character';
import { ReminderToken } from '../../reminder-token';

export class Minstrel extends Character {
  constructor() {
    super();
    this.id = 'minstrel';
    this.reminderTokens = [new ReminderToken('Everyone Drunk', 'has made everyone drunk.', this)];
  }
}
