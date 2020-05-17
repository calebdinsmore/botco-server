import { CommandValidationError } from './../../../util/command-validation-error';
import { Command } from '@colyseus/command';
import { GameState } from '../../../schemas';
import { isDefined } from '../../../util/util-functions';
import * as _ from 'lodash';
import { Client } from 'colyseus';
import { RemovePlayerPayloadDto } from './dto/remove-player-payload.dto';

export class RemovePlayerCommand extends Command<
  GameState,
  { sessionId: string; client?: Client; options: RemovePlayerPayloadDto }
> {
  validate({ sessionId, options } = this.payload) {
    if (sessionId === this.state.storyteller?.playerId) {
      if (isDefined(options.playerId) && this.state.players[options.playerId]) {
        return true;
      }
      throw new CommandValidationError('Malformed command.');
    }
    throw new CommandValidationError('Only the Storyteller can remove players.');
  }

  execute({ client, options } = this.payload) {
    if (client) {
      client.leave(1000);
    }
    this.state.removePlayer(options.playerId);
  }
}
