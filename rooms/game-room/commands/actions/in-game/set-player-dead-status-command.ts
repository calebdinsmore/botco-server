import { Player } from './../../../schemas/player';
import { CommandValidationError } from './../../../util/command-validation-error';
import { Command } from '@colyseus/command';
import { GameState } from '../../../schemas';
import { RemoveReminderTokenPayloadDto } from './dto/remove-reminder-token-payload.dto';
import { isDefined } from '../../../util/util-functions';
import * as _ from 'lodash';
import { SetPlayerDeadStatusPayloadDto } from './dto/set-player-dead-status-payload.dto';

export class SetPlayerDeadStatusCommand extends Command<
  GameState,
  { sessionId: string; options: SetPlayerDeadStatusPayloadDto }
> {
  validate({ sessionId, options } = this.payload) {
    if (sessionId === this.state.storyteller?.playerId) {
      if (isDefined(options.playerId) && isDefined(options.isDead)) {
        return true;
      }
      throw new CommandValidationError('Malformed command.');
    }
    throw new CommandValidationError('Only the Storyteller can do this.');
  }

  execute({ sessionId, options } = this.payload) {
    const player: Player = this.state.players[options.playerId];
    if (player) {
      player.isDead = options.isDead;
    }
  }
}
