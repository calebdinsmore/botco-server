import { Character } from '../../character';
import { ReminderToken } from '../../reminder-token';

export class Seamstress extends Character {
  constructor() {
    super();
    this.id = 'seamstress';
    this.reminderTokens = [new ReminderToken('Used', 'has used their ability.', this)];
  }
}
