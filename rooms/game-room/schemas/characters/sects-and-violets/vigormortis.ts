import { Character } from '../../character';
import { ReminderToken } from '../../reminder-token';

export class Vigormortis extends Character {
  constructor() {
    super();
    this.id = 'vigormortis';
    this.reminderTokens = [
      new ReminderToken('Die', 'dies tonight (Vigormortis).', this),
      new ReminderToken('Poisoned', 'is poisoned (Vigormortis).', this),
      new ReminderToken('Ability Active', 'still has their ability.', this),
    ];
  }
}
