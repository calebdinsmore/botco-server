import { CharacterSetEnum } from '../../../../schemas/enum/character-set.enum';

export interface SetCharactersDto {
  characterNames: string[];
  characterSet: CharacterSetEnum;
  includeReminderTokensFor: string[];
}
