import { Character } from '../../character';
import { ReminderToken } from '../../reminder-token';

export class FangGu extends Character {
  constructor() {
    super();
    this.id = 'fanggu';
    this.reminderTokens = [new ReminderToken('Die', 'dies tonight (Fang Gu).', this)];
  }
}
