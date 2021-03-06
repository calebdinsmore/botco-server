import { Character } from '../../character';
import { CharacterTypeEnum } from '../../enum/character-type.enum';
import { ReminderToken } from '../../reminder-token';

export class Investigator extends Character {
  constructor() {
    super();
    this.id = 'investigator';
    this.reminderTokens = [
      new ReminderToken('Wrong', 'is not the true Minion.', this),
      new ReminderToken('Minion', 'is the true Minion.', this),
    ];
  }
}
