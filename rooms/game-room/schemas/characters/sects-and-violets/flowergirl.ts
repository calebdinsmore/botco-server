import { Character } from '../../character';
import { ReminderToken } from '../../reminder-token';

export class Flowergirl extends Character {
  constructor() {
    super();
    this.id = 'flowergirl';
    this.reminderTokens = [
      new ReminderToken('Demon Voted', 'will be told the demon voted.', this),
      new ReminderToken('Demon Did Not Vote', 'will be told the demon did not vote.', this),
    ];
  }
}
