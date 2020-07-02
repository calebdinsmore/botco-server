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
  ability: string;
}
import rolesJsonFile from './roles.json';
import { BadMoonRisingSet } from '../schemas/characters/sets/bad-moon-rising-set';
import { SectsAndVioletsSet } from '../schemas/characters/sets/sects-and-violets-set';
import { LaissezUnFaireSet } from '../schemas/characters/sets/laissez-un-faire-set';
export const rolesJson: JsonRole[] = rolesJsonFile;

export function isDefined(value: any) {
  return value !== undefined && value !== null;
}

export function getCharacterSet(characterSet: CharacterSetEnum) {
  switch (characterSet) {
    case CharacterSetEnum.TroubleBrewing:
      return new TroubleBrewingSet();
    case CharacterSetEnum.BadMoonRising:
      return new BadMoonRisingSet();
    case CharacterSetEnum.SectsAndViolets:
      return new SectsAndVioletsSet();
    case CharacterSetEnum.LaissezUnFaire:
      return new LaissezUnFaireSet();
  }
}
