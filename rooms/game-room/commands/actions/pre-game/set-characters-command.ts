import { TroubleBrewingSet } from './../../../schemas/characters/sets/trouble-brewing-set';
import { CommandValidationError } from './../../../util/command-validation-error';
import { Command } from '@colyseus/command';
import { GameState } from '../../../schemas';
import { isDefined } from '../../../util/util-functions';
import { SetCharactersDto } from './dto/set-characters.dto';

export class SetCharactersCommand extends Command<GameState, { sessionId: string; options: SetCharactersDto }> {
  validate({ sessionId, options } = this.payload) {
    if (isDefined(options.characterNames)) {
      if (sessionId === this.state.storyteller.playerId) {
        if (options.characterNames.length !== this.state.gameMeta.playerCount) {
          throw new CommandValidationError('Number of chosen characters must match the number of players in the room.');
        }
        return true;
      }
      throw new CommandValidationError('Only the Storyteller can arrange seats.');
    }
    throw new CommandValidationError('Malformed Command.');
  }

  execute({ sessionId, options } = this.payload) {
    const shuffledNames = options.characterNames.sort(() => Math.random() - 0.5);
    const tbSet = new TroubleBrewingSet();
    for (let id in this.state.players) {
      this.state.players[id].character = tbSet.getCharacter(shuffledNames.pop());
      this.state.reminderTokens.push(...this.state.players[id].character.reminderTokens);
    }
    if (options.includeReminderTokensFor?.length) {
      for (const name of options.includeReminderTokensFor) {
        const character = tbSet.getCharacter(name);
        if (character) {
          this.state.reminderTokens.push(...character.reminderTokens);
        }
      }
    }
    this.state.charactersDistributed = true;
  }
}
