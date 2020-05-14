import { Character } from './../../../schemas/character';
import { ChangePlayerCharacterPayloadDto } from './dto/change-player-character-payload.dto';
import { Player } from './../../../schemas/player';
import { CommandValidationError } from './../../../util/command-validation-error';
import { Command } from '@colyseus/command';
import { GameState } from '../../../schemas';
import { isDefined, getCharacterSet } from '../../../util/util-functions';
import * as _ from 'lodash';

export class ChangePlayerCharacterCommand extends Command<
  GameState,
  { sessionId: string; options: ChangePlayerCharacterPayloadDto }
> {
  validate({ sessionId, options } = this.payload) {
    if (sessionId === this.state.storyteller?.playerId) {
      if (isDefined(options.playerId) && isDefined(options.characterSet) && isDefined(options.characterName)) {
        return true;
      }
      throw new CommandValidationError('Malformed command.');
    }
    throw new CommandValidationError('Only the Storyteller can do this.');
  }

  execute({ sessionId, options } = this.payload) {
    const player: Player = this.state.players[options.playerId];
    const currentCharacter = player.character.clone();
    const characterSet = getCharacterSet(options.characterSet);
    const newCharacter = characterSet?.getCharacter(options.characterName);
    if (player && newCharacter) {
      this.removeFormerCharacterData(currentCharacter);
      this.state.reminderTokens.push(...newCharacter.reminderTokens);
      player.character = newCharacter;
    }
  }

  private removeFormerCharacterData(oldCharacter: Character) {
    for (let id in this.state.players) {
      const player: Player = this.state.players[id];
      player.reminderTokens = player.reminderTokens.filter((x) => x.character.name !== oldCharacter.name);
    }
    this.state.reminderTokens = this.state.reminderTokens.filter((x) => x.character.name !== oldCharacter.name);
  }
}
