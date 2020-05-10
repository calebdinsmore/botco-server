import { Character } from '../../character';
import { CharacterTypeEnum } from '../../enum/character-type.enum';
import { ReminderToken } from '../../reminder-token';

export class Poisoner extends Character {
  constructor() {
    super();
    this.name = 'Poisoner';
    this.rulesText = 'Each night, choose a player: their ability malfunctions tonight and tomorrow day.';
    this.image = '/assets/images/characters/tb/Poisoner.png';
    this.characterType = CharacterTypeEnum.Minion;
    this.reminderTokens = [new ReminderToken('Poisoned', 'has been Poisoned.', this)];
  }
}
