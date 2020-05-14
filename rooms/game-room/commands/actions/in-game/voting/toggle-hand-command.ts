import * as _ from 'lodash';
import { Command } from '@colyseus/command';
import { GameState } from '../../../../schemas';
import { CommandValidationError } from '../../../../util/command-validation-error';

export class ToggleHandCommand extends Command<GameState, { sessionId: string }> {
  validate({ sessionId } = this.payload) {
    if (!this.state.votingSchema.nominatedPlayerId) {
      throw new CommandValidationError('No player has been nominated.');
    }
    if (this.state.players[sessionId]?.handLocked) {
      throw new CommandValidationError('Your hand has been locked in.');
    }
    return true;
  }

  execute({ sessionId } = this.payload) {
    this.state.players[sessionId].handRaised = !this.state.players[sessionId].handRaised;
  }
}
