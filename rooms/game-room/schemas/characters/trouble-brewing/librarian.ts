import { Character } from '../../character';
import { CharacterTypeEnum } from '../../enum/character-type.enum';
import { ReminderToken } from '../../reminder-token';

export class Librarian extends Character {
  constructor() {
    super();
    this.id = 'librarian';
    this.reminderTokens = [
      new ReminderToken('Wrong', 'is not the true Outsider.', this),
      new ReminderToken('Outsider', 'is the true Outsider.', this),
    ];
  }
}
