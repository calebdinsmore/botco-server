import { Character } from '../../character';
import { ReminderToken } from '../../reminder-token';

export class DevilsAdvocate extends Character {
  constructor() {
    super();
    this.id = 'devilsadvocate';
    this.reminderTokens = [new ReminderToken('Survives Execution', "will survive execution (Devil's Advocate).", this)];
  }
}
