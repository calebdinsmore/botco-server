import { CharacterTypeEnum } from './enum/character-type.enum';
import { Schema, type } from '@colyseus/schema';
import { ReminderToken } from './reminder-token';
import { CharacterSetEnum } from './enum/character-set.enum';

export class Character extends Schema {
  @type('string')
  id: string;

  @type('string')
  name: string;

  @type('string')
  rulesText: string;

  @type('string')
  image: string;

  @type('string')
  characterType: CharacterTypeEnum;

  @type('number')
  firstNightPriority: number = 0;

  @type('number')
  otherNightPriority: number = 0;

  @type('string')
  firstNightReminder: string;

  @type('string')
  otherNightReminder: string;

  @type('boolean')
  setup: boolean = false;

  @type('string')
  characterSet: CharacterSetEnum;

  reminderTokens: ReminderToken[] = [];
}
