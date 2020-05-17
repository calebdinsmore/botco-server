import { Character } from '../../character';
import { ReminderToken } from '../../reminder-token';

export class Juggler extends Character {
  constructor() {
    super();
    this.id = 'juggler';
    this.reminderTokens = [new ReminderToken('Correct', 'was guessed correctly by the Juggler.', this, true)];
  }
}
