import { Character } from '../../character';
import { CharacterTypeEnum } from '../../enum/character-type.enum';
import { ReminderToken } from '../../reminder-token';

export class Courtier extends Character {
  constructor() {
    super();
    this.id = 'courtier';
    this.reminderTokens = [
      new ReminderToken('Drunk (3)', 'is drunk for 3 days/nights (Courtier).', this),
      new ReminderToken('Drunk (2)', 'is drunk for 2 days/nights (Courtier).', this),
      new ReminderToken('Drunk (1)', 'is drunk for 1 day/night (Courtier).', this),
      new ReminderToken('Used', 'has used their ability.', this),
    ];
  }
}
