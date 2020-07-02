import { Character } from '../../character';
import { ReminderToken } from '../../reminder-token';

export class Fisherman extends Character {
  constructor() {
    super();
    this.id = 'fisherman';
    this.reminderTokens = [new ReminderToken('Used', 'has used their ability', this)];
  }
}
