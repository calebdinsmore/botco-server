import { RevealGrimoirePayloadDto } from './dto/reveal-grimoire-payload.dto';
import { CommandValidationError } from './../../../util/command-validation-error';
import { Command } from '@colyseus/command';
import { GameState } from '../../../schemas';
import { isDefined } from '../../../util/util-functions';
import * as _ from 'lodash';
import { Client } from 'colyseus';

export class RevealGrimoireCommand extends Command<
  GameState,
  { sessionId: string; newRevealedClient: Client; oldRevealedClient: Client; options: RevealGrimoirePayloadDto }
> {
  validate({ sessionId, options } = this.payload) {
    if (sessionId === this.state.storyteller.playerId) {
      if (!isDefined(options.playerId) || this.state.players[options.playerId]) {
        return true;
      }
      throw new CommandValidationError('Malformed command.');
    }
    throw new CommandValidationError('Only the Storyteller can reveal the Grimoire.');
  }

  execute({ oldRevealedClient, newRevealedClient, options } = this.payload) {
    this.state.canSeeGrimoirePlayerId = options.playerId;
    if (newRevealedClient) {
      newRevealedClient.send('grimoire_snapshot', this.state);
    }
    if (oldRevealedClient) {
      oldRevealedClient.send('reset_state');
    }
  }
}
