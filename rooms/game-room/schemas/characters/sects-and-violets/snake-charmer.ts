import { Character } from '../../character';
import { ReminderToken } from '../../reminder-token';

export class SnakeCharmer extends Character {
  constructor() {
    super();
    this.id = 'snakecharmer';
    this.reminderTokens = [new ReminderToken('Poisoned', 'is poisoned (Snake Charmer).', this)];
  }
}
