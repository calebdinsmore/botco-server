import { Character } from '../../character';
import { CharacterTypeEnum } from '../../enum/character-type.enum';
import { ReminderToken } from '../../reminder-token';

export class Slayer extends Character {
  constructor() {
    super();
    this.id = 'slayer';
    this.reminderTokens = [new ReminderToken('No Ability', 'has lost their ability.', this)];
  }
}
