import { Character } from '../../character';
import { ReminderToken } from '../../reminder-token';

export class TownCrier extends Character {
  constructor() {
    super();
    this.id = 'towncrier';
    this.reminderTokens = [
      new ReminderToken('No Minion Nominated', 'will be told no minion nominated.', this),
      new ReminderToken('Minion Did Nominate', 'will be told a minion nominated.', this),
    ];
  }
}
