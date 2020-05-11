import { Character } from '../../character';
import { CharacterTypeEnum } from '../../enum/character-type.enum';
import { ReminderToken } from '../../reminder-token';

export class Washerwoman extends Character {
  constructor() {
    super();
    this.id = 'washerwoman';
    this.reminderTokens = [
      new ReminderToken('Wrong', 'is not the true Townsfolk.', this),
      new ReminderToken('Townsfolk', 'is the true Townsfolk.', this),
    ];
  }
}
