import { Character } from '../../character';
import { ReminderToken } from '../../reminder-token';

export class Moonchild extends Character {
  constructor() {
    super();
    this.id = 'moonchild';
    this.reminderTokens = [new ReminderToken('Dead', 'was killed by the Moonchild.', this)];
  }
}
