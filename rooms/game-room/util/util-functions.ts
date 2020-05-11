import { TroubleBrewingSet } from './../schemas/characters/sets/trouble-brewing-set';
import { CharacterSetEnum } from './../schemas/enum/character-set.enum';
export interface JsonRole {
  id: string;
  name: string;
  edition: string;
  team: string;
  firstNight: number;
  firstNightReminder: string;
  otherNight: number;
  otherNightReminder: string;
  setup: boolean;
}
import rolesJsonFile from './roles.json';
export const rolesJson: JsonRole[] = rolesJsonFile;

export function isDefined(value: any) {
  return value !== undefined && value !== null;
}

export function getCharacterSet(characterSet: CharacterSetEnum) {
  switch (characterSet) {
    case CharacterSetEnum.TroubleBrewing:
      return new TroubleBrewingSet();
    case CharacterSetEnum.BadMoonRising:
    // return set
    case CharacterSetEnum.SectsAndViolets:
    // return set
  }
}
