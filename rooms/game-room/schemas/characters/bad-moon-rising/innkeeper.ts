import { Character } from '../../character';
import { CharacterTypeEnum } from '../../enum/character-type.enum';
import { ReminderToken } from '../../reminder-token';

export class Innkeeper extends Character {
  constructor() {
    super();
    this.id = 'innkeeper';
    this.reminderTokens = [
      new ReminderToken('Protected', 'is protected by the Innkeeper.', this),
      new ReminderToken('Drunk', 'is drunk (Innkeeper).', this),
    ];
  }
}
