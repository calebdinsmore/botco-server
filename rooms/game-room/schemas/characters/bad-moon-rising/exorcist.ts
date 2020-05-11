import { Character } from '../../character';
import { CharacterTypeEnum } from '../../enum/character-type.enum';
import { ReminderToken } from '../../reminder-token';

export class Exorcist extends Character {
  constructor() {
    super();
    this.id = 'exorcist';
    this.reminderTokens = [new ReminderToken('Chosen', 'was chosen by the Exorcist.', this)];
  }
}
