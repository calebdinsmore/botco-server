import { Character } from '../../character';
import { CharacterTypeEnum } from '../../enum/character-type.enum';
import { ReminderToken } from '../../reminder-token';

export class Grandmother extends Character {
  constructor() {
    super();
    this.id = 'grandmother';
    this.reminderTokens = [new ReminderToken('Grandchild', "is the Grandmother's child.", this)];
  }
}
