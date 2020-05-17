import { Character } from '../../character';
import { ReminderToken } from '../../reminder-token';

export class Artist extends Character {
  constructor() {
    super();
    this.id = 'artist';
    this.reminderTokens = [new ReminderToken('Used', 'has used their ability.', this)];
  }
}
