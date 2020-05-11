import { Character } from '../../character';
import { CharacterTypeEnum } from '../../enum/character-type.enum';
import { ReminderToken } from '../../reminder-token';

export class Monk extends Character {
  constructor() {
    super();
    this.id = 'monk';
    this.reminderTokens = [new ReminderToken('Safe', 'is protected by the Monk.', this)];
  }
}
