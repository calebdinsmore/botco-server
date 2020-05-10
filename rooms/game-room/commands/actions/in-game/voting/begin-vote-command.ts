import * as _ from 'lodash';
import { Command } from '@colyseus/command';
import { GameState } from '../../../../schemas';
import { CommandValidationError } from '../../../../util/command-validation-error';
import { VotePhaseEnum } from '../../../../schemas/enum/vote-phase.enum';

export class BeginVoteCommand extends Command<GameState, { sessionId: string }> {
  validate({ sessionId } = this.payload) {
    if (!this.state.votingSchema.nominatedPlayerId) {
      throw new CommandValidationError('Cannot begin vote without a nominated player.');
    }
    if (this.state.votingSchema.voteInProgress) {
      throw new CommandValidationError('Vote currently in progress.');
    }
    if (sessionId !== this.state.storyteller.playerId) {
      throw new CommandValidationError('Only the Storyteller can begin the vote.');
    }
    return true;
  }

  execute({ sessionId } = this.payload) {
    this.state.votingSchema.beginVote = true;
    this.state.votingSchema.votePhase = VotePhaseEnum.RunningVote;
  }
}
