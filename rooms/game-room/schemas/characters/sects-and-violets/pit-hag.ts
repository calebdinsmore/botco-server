import { Character } from '../../character';
import { ReminderToken } from '../../reminder-token';

export class PitHag extends Character {
  constructor() {
    super();
    this.id = 'pithag';
    this.reminderTokens = [new ReminderToken('Chosen', 'has been chosen by the Pit Hag.', this)];
  }
}
