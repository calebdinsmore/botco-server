import { Character } from '../../character';
import { CharacterTypeEnum } from '../../enum/character-type.enum';
import { ReminderToken } from '../../reminder-token';

export class Gossip extends Character {
  constructor() {
    super();
    this.id = 'gossip';
    this.reminderTokens = [new ReminderToken('Dead', 'was killed by the Gossip.', this)];
  }
}
