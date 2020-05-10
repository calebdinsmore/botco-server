import { Character } from '../../character';
import { CharacterTypeEnum } from '../../enum/character-type.enum';
import { ReminderToken } from '../../reminder-token';

export class Washerwoman extends Character {
  constructor() {
    super();
    this.name = 'Washerwoman';
    this.rulesText = 'You start knowing 1 of 2 players is a particular Townsfolk.';
    this.image = '/assets/images/characters/tb/Washerwoman.png';
    this.characterType = CharacterTypeEnum.Townsfolk;
    this.reminderTokens = [
      new ReminderToken('Wrong', 'is not the true Townsfolk.', this),
      new ReminderToken('Townsfolk', 'is the true Townsfolk.', this),
    ];
  }
}
