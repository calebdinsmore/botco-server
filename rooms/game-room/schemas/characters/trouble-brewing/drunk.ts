import { Character } from '../../character';
import { CharacterTypeEnum } from '../../enum/character-type.enum';
import { ReminderToken } from '../../reminder-token';

export class Drunk extends Character {
  constructor() {
    super();
    this.id = 'drunk';
    this.reminderTokens = [new ReminderToken('Drunk', 'is the Drunk', this)];
  }
}
