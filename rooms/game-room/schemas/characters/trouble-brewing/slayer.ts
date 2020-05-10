import { Character } from '../../character';
import { CharacterTypeEnum } from '../../enum/character-type.enum';
import { ReminderToken } from '../../reminder-token';

export class Slayer extends Character {
  constructor() {
    super();
    this.name = 'Slayer';
    this.rulesText = 'Once per game, during the day, publicly choose a player: if they are the Demon, they die.';
    this.image = '/assets/images/characters/tb/Slayer.png';
    this.characterType = CharacterTypeEnum.Townsfolk;
    this.reminderTokens = [new ReminderToken('No Ability', 'has lost their ability.', this)];
  }
}
