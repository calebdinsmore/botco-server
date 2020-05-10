import { Character } from '../../character';
import { CharacterTypeEnum } from '../../enum/character-type.enum';
import { ReminderToken } from '../../reminder-token';

export class Virgin extends Character {
  constructor() {
    super();
    this.name = 'Virgin';
    this.rulesText = 'The 1st time you are nominated, if the nominator is a Townsfolk, they are executed immediately.';
    this.image = '/assets/images/characters/tb/Virgin.png';
    this.characterType = CharacterTypeEnum.Townsfolk;
    this.reminderTokens = [new ReminderToken('No Ability', 'has lost their ability.', this)];
  }
}
