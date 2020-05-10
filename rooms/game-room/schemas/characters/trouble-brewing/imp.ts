import { Character } from '../../character';
import { CharacterTypeEnum } from '../../enum/character-type.enum';
import { ReminderToken } from '../../reminder-token';

export class Imp extends Character {
  constructor() {
    super();
    this.name = 'Imp';
    this.rulesText = 'Each night*, choose a player: they die. If you kill yourself this way, a Minion becomes the Imp';
    this.image = '/assets/images/characters/tb/Imp.png';
    this.characterType = CharacterTypeEnum.Demon;
    this.reminderTokens = [new ReminderToken('Dead', 'has been attacked by the Imp.', this)];
  }
}
