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

  @type('boolean')
  sticky: boolean = false;

  constructor(shortName: string, description: string, character: Character, sticky = false) {
    super();
    this.shortName = shortName;
    this.description = description;
    this.character = character;
    this.id = uuidv4();
    this.sticky = sticky;
  }
}
