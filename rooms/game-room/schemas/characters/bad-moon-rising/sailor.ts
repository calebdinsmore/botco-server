import { Character } from '../../character';
import { CharacterTypeEnum } from '../../enum/character-type.enum';
import { ReminderToken } from '../../reminder-token';

export class Sailor extends Character {
  constructor() {
    super();
    this.id = 'sailor';
    this.reminderTokens = [new ReminderToken('Drunk', 'is drunk.', this)];
  }
}
