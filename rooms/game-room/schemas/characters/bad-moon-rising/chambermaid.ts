import { Character } from '../../character';
import { CharacterTypeEnum } from '../../enum/character-type.enum';
import { ReminderToken } from '../../reminder-token';

export class Chambermaid extends Character {
  constructor() {
    super();
    this.id = 'chambermaid';
  }
}
