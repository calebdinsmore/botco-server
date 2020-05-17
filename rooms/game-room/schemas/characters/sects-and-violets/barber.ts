import { Character } from '../../character';
import { ReminderToken } from '../../reminder-token';

export class Barber extends Character {
  constructor() {
    super();
    this.id = 'barber';
    this.reminderTokens = [
      new ReminderToken('Swap', 'is to be swapped with another character.', this),
      new ReminderToken('Swap', 'is to be swapped with another character.', this),
    ];
  }
}
