import { Character } from '../../character';
import { ReminderToken } from '../../reminder-token';

export class Leviathan extends Character {
  constructor() {
    super();
    this.id = 'leviathan';
    this.reminderTokens = [
      new ReminderToken('Good Executed', 'is a good player that was executed.', this, true),
      new ReminderToken('Day 1', 'is on Day 1.', this),
      new ReminderToken('Day 2', 'is on Day 2.', this),
      new ReminderToken('Day 3', 'is on Day 3.', this),
      new ReminderToken('Day 4', 'is on Day 4.', this),
      new ReminderToken('Day 5', 'is on Day 5.', this),
    ];
  }
}
