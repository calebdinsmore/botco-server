import { Character } from '../../character';
import { ReminderToken } from '../../reminder-token';

export class Fool extends Character {
  constructor() {
    super();
    this.id = 'fool';
    this.reminderTokens = [new ReminderToken('Used', 'has used their ability.', this)];
  }
}
