import { Player } from './../../../schemas/player';
import { CommandValidationError } from './../../../util/command-validation-error';
import { Command } from '@colyseus/command';
import { GameState } from '../../../schemas';
import { RemoveReminderTokenPayloadDto } from './dto/remove-reminder-token-payload.dto';
import { isDefined } from '../../../util/util-functions';
import * as _ from 'lodash';

export class RemoveReminderTokenCommand extends Command<
  GameState,
  { sessionId: string; options: RemoveReminderTokenPayloadDto }
> {
  validate({ sessionId, options } = this.payload) {
    if (sessionId === this.state.storyteller.playerId) {
      if (isDefined(options.playerId) && isDefined(options.reminderTokenId)) {
        return true;
      }
      throw new CommandValidationError('Malformed command.');
    }
    throw new CommandValidationError('Only the Storyteller can control reminder tokens.');
  }

  execute({ sessionId, options } = this.payload) {
    const player: Player = this.state.players[options.playerId];
    const index = _.findIndex(player.reminderTokens, (x) => x.id === options.reminderTokenId);
    const token = player.reminderTokens[index].clone();
    this.state.reminderTokens.push(token);
    player.reminderTokens.splice(index, 1);
  }
}
