import { Character } from '../../character';
import { CharacterTypeEnum } from '../../enum/character-type.enum';
import { ReminderToken } from '../../reminder-token';

export class ScarletWoman extends Character {
  constructor() {
    super();
    this.name = 'Scarlet Woman';
    this.rulesText =
      "If there are 5 or more players alive & the Demon dies, you become the Demon. (Travelers don't count)";
    this.image = '/assets/images/characters/tb/ScarletWoman.png';
    this.characterType = CharacterTypeEnum.Minion;
    this.reminderTokens = [new ReminderToken('Is the Demon', 'has become the Demon.', this)];
  }
}
