import { CommandValidationError } from './../../../util/command-validation-error';
import { Command } from '@colyseus/command';
import { GameState } from '../../../schemas';
import { isDefined } from '../../../util/util-functions';
import { AddReminderTokenDto } from './dto/add-reminder-token.dto';
import * as _ from 'lodash';
import { ReminderToken } from '../../../schemas/reminder-token';

export class AddReminderTokenCommand extends Command<GameState, { sessionId: string; options: AddReminderTokenDto }> {
  validate({ sessionId, options } = this.payload) {
    if (isDefined(options.reminderTokenId) && isDefined(options.playerId)) {
      if (sessionId === this.state.storyteller?.playerId) {
        if (
          _.find(this.state.reminderTokens, (x) => x.id === options.reminderTokenId) &&
          this.state.players[options.playerId]
        ) {
          return true;
        }
        throw new CommandValidationError('Supplied reminder token or player not found.');
      }
      throw new CommandValidationError('Only the Storyteller can add reminder tokens.');
    }
    throw new CommandValidationError('Malformed Command.');
  }

  execute({ sessionId, options } = this.payload) {
    const index = _.findIndex(this.state.reminderTokens, (x) => x.id === options.reminderTokenId);
    const token: ReminderToken = this.state.reminderTokens[index].clone();
    if (!token.sticky) {
      this.state.reminderTokens.splice(index, 1);
    }
    this.state.players[options.playerId].reminderTokens.push(token);
  }
}
