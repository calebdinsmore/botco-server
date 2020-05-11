import { Character } from '../../character';
import { CharacterTypeEnum } from '../../enum/character-type.enum';
import { ReminderToken } from '../../reminder-token';

export class Poisoner extends Character {
  constructor() {
    super();
    this.id = 'poisoner';
    this.reminderTokens = [new ReminderToken('Poisoned', 'has been Poisoned.', this)];
  }
}
