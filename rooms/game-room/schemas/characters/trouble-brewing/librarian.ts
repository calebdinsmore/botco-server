import { Character } from '../../character';
import { CharacterTypeEnum } from '../../enum/character-type.enum';
import { ReminderToken } from '../../reminder-token';

export class Librarian extends Character {
  constructor() {
    super();
    this.name = 'Librarian';
    this.rulesText = 'You start knowing that 1 of 2 players is a particular Outsider. (Or that zero are in play)';
    this.image = '/assets/images/characters/tb/Librarian.png';
    this.characterType = CharacterTypeEnum.Townsfolk;
    this.reminderTokens = [
      new ReminderToken('Wrong', 'is not the true Outsider.', this),
      new ReminderToken('Outsider', 'is the true Outsider.', this),
    ];
  }
}
