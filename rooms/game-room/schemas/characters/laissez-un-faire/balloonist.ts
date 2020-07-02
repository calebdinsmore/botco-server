import { Character } from '../../character';
import { ReminderToken } from '../../reminder-token';

export class Balloonist extends Character {
  constructor() {
    super();
    this.id = 'balloonist';
    this.reminderTokens = [new ReminderToken('Seen', "'s character type has been seen.", this, true)];
  }
}
