import { rolesJson } from './../../util/util-functions';
import { Character } from '../character';
import * as _ from 'lodash';

export class CharacterSet {
  characters: Character[];

  constructor(...characters: Character[]) {
    for (const character of characters) {
      const jsonCharacter = _.find(rolesJson, (x) => x.name.toLowerCase() === character.name.toLowerCase());
      character.firstNightPriority = jsonCharacter.firstNight;
      character.otherNightPriority = jsonCharacter.otherNight;
      character.firstNightReminder = jsonCharacter.firstNightReminder;
      character.otherNightReminder = jsonCharacter.otherNightReminder;
      character.setup = jsonCharacter.setup;
    }
    this.characters = characters;
  }

  getCharacter(name: string): Character | undefined {
    for (const character of this.characters) {
      if (name.toLowerCase() === character.name.toLowerCase()) {
        return character;
      }
    }
  }
}
