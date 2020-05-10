import { Schema, type } from '@colyseus/schema';
import { Character } from './character';
import { v4 as uuidv4 } from 'uuid';

export class ReminderToken extends Schema {
  @type('string')
  id: string;

  @type('boolean')
  isLocked: boolean = false;

  @type('string')
  shortName: string;

  @type('string')
  description: string;

  @type(Character)
  character: Character;

  constructor(shortName: string, description: string, character: Character) {
    super();
    this.shortName = shortName;
    this.description = description;
    this.character = character;
    this.id = uuidv4();
  }
}
