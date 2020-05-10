import { Character } from '../../character';
import { CharacterTypeEnum } from '../../enum/character-type.enum';
import { ReminderToken } from '../../reminder-token';

export class Drunk extends Character {
  constructor() {
    super();
    this.name = 'Drunk';
    this.rulesText = 'You do not know you are the Drunk. You think you are a Townsfolk, but your ability malfunctions.';
    this.image = '/assets/images/characters/tb/Drunk.png';
    this.characterType = CharacterTypeEnum.Outsider;
    this.reminderTokens = [new ReminderToken('Drunk', 'is the Drunk', this)];
  }
}
