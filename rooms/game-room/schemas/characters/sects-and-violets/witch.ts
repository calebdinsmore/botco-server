import { Character } from '../../character';
import { ReminderToken } from '../../reminder-token';

export class Witch extends Character {
  constructor() {
    super();
    this.id = 'witch';
    this.reminderTokens = [new ReminderToken('Cursed', 'has been cursed and will die if they nominate.', this)];
  }
}
