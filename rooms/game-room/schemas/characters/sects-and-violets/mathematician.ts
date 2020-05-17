import { Character } from '../../character';
import { ReminderToken } from '../../reminder-token';

export class Mathematician extends Character {
  constructor() {
    super();
    this.id = 'mathematician';
    this.reminderTokens = [new ReminderToken('Abnormal Effect', 'had an ability malfunction.', this, true)];
  }
}
