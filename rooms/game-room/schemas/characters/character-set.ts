import { rolesJson } from './../../util/util-functions';
import { Character } from '../character';
import * as _ from 'lodash';
import { CharacterTypeEnum } from '../enum/character-type.enum';
import { CharacterSetEnum } from '../enum/character-set.enum';

export class CharacterSet {
  setName: CharacterSetEnum;
  image: string;
  characters: Character[];

  constructor(characters: Character[], setName: CharacterSetEnum, image: string) {
    for (const character of characters) {
      const jsonCharacter = _.find(rolesJson, (x) => x.id === character.id);
      character.name = jsonCharacter.name;
      character.rulesText = jsonCharacter.ability;
      character.image = `/assets/images/characters/${jsonCharacter.edition}/${jsonCharacter.id}.png`;
      character.firstNightPriority = jsonCharacter.firstNight;
      character.otherNightPriority = jsonCharacter.otherNight;
      character.firstNightReminder = jsonCharacter.firstNightReminder;
      character.otherNightReminder = jsonCharacter.otherNightReminder;
      character.characterType = jsonCharacter.team as CharacterTypeEnum;
      character.characterSet = setName;
      character.setup = jsonCharacter.setup;
    }
    this.characters = characters;
    this.setName = setName;
    this.image = image;
  }

  getCharacter(name: string): Character | undefined {
    for (const character of this.characters) {
      if (name.toLowerCase() === character.name.toLowerCase()) {
        return character;
      }
    }
  }
}
