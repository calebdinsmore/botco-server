import { Character } from '../../character';
import { CharacterTypeEnum } from '../../enum/character-type.enum';
import { ReminderToken } from '../../reminder-token';

export class ScarletWoman extends Character {
  constructor() {
    super();
    this.id = 'scarletwoman';
    this.reminderTokens = [new ReminderToken('Is the Demon', 'has become the Demon.', this)];
  }
}
