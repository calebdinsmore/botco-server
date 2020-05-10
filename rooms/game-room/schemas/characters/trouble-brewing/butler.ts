import { Character } from '../../character';
import { CharacterTypeEnum } from '../../enum/character-type.enum';
import { ReminderToken } from '../../reminder-token';

export class Butler extends Character {
  constructor() {
    super();
    this.name = 'Butler';
    this.rulesText = 'Each night, choose a player (not yourself): tomorrow, you may only vote if they are voting too.';
    this.image = '/assets/images/characters/tb/Butler.png';
    this.characterType = CharacterTypeEnum.Outsider;
    this.reminderTokens = [new ReminderToken('Master', "is the Butler's master", this)];
  }
}
