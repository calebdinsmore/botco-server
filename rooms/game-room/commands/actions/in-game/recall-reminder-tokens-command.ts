import { ArraySchema } from '@colyseus/schema';
import { CommandValidationError } from './../../../util/command-validation-error';
import { Command } from '@colyseus/command';
import { GameState } from '../../../schemas';
import { ReminderToken } from '../../../schemas/reminder-token';

export class RecallReminderTokensCommand extends Command<GameState, { sessionId: string }> {
  validate({ sessionId } = this.payload) {
    if (sessionId === this.state.storyteller?.playerId) {
      return true;
    }
    throw new CommandValidationError('Only the Storyteller can control reminder tokens.');
  }

  execute({ sessionId } = this.payload) {
    const reminderTokens = [];
    for (const id in this.state.players) {
      for (const reminderToken of this.state.players[id].reminderTokens) {
        if (!reminderToken.isLocked) {
          reminderTokens.push(reminderToken);
        }
      }
      this.state.players[id].reminderTokens = new ArraySchema<ReminderToken>();
    }
    this.state.reminderTokens.push(...reminderTokens);
  }
}
