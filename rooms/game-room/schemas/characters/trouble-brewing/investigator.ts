import { Character } from '../../character';
import { CharacterTypeEnum } from '../../enum/character-type.enum';
import { ReminderToken } from '../../reminder-token';

export class Investigator extends Character {
  constructor() {
    super();
    this.name = 'Investigator';
    this.rulesText = 'You start knowing 1 of 2 players is a particular Minion.';
    this.image = '/assets/images/characters/tb/Investigator.png';
    this.characterType = CharacterTypeEnum.Townsfolk;
    this.reminderTokens = [
      new ReminderToken('Wrong', 'is not the true Minion.', this),
      new ReminderToken('Minion', 'is the true Minion.', this),
    ];
  }
}
