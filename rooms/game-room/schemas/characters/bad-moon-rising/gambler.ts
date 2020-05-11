import { Character } from '../../character';
import { CharacterTypeEnum } from '../../enum/character-type.enum';
import { ReminderToken } from '../../reminder-token';

export class Gambler extends Character {
  constructor() {
    super();
    this.id = 'gambler';
    this.reminderTokens = [new ReminderToken('Dead', 'guessed wrong and died.', this)];
  }
}
