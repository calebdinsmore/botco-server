import { ArraySchema } from '@colyseus/schema';
import { CommandValidationError } from './../../../util/command-validation-error';
import { Command } from '@colyseus/command';
import { GameState } from '../../../schemas';
import { ReminderToken } from '../../../schemas/reminder-token';

export class ToggleRoomLockCommand extends Command<GameState, { sessionId: string }> {
  validate({ sessionId } = this.payload) {
    if (sessionId === this.state.storyteller?.playerId) {
      return true;
    }
    throw new CommandValidationError('Only the Storyteller can perform this action.');
  }

  execute({ sessionId } = this.payload) {
    this.state.isLocked = !this.state.isLocked;
  }
}
