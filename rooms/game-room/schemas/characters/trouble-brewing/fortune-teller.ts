import { Character } from '../../character';
import { ReminderToken } from '../../reminder-token';

export class FortuneTeller extends Character {
  constructor() {
    super();
    this.id = 'fortuneteller';
    this.reminderTokens = [new ReminderToken('Red Herring', "is the Fortune Teller's red herring.", this)];
  }
}
