import { ConfirmVotePayloadDto } from './dto/confirm-vote-payload.dto';
import { Player } from './../../../../schemas/player';
import * as _ from 'lodash';
import { Command } from '@colyseus/command';
import { GameState } from '../../../../schemas';
import { CommandValidationError } from '../../../../util/command-validation-error';
import { isDefined } from '../../../../util/util-functions';
import { VotePhaseEnum } from '../../../../schemas/enum/vote-phase.enum';

export class ConfirmVoteCommand extends Command<GameState, { sessionId: string; options: ConfirmVotePayloadDto }> {
  validate({ sessionId, options } = this.payload) {
    const voteCount = options.voteCount;
    if (!isDefined(voteCount)) {
      throw new CommandValidationError('Invalid vote count.');
    }
    if (sessionId !== this.state.storyteller.playerId) {
      throw new CommandValidationError('Only the Storyteller can confirm votes.');
    }
    if (this.state.votingSchema.votePhase !== VotePhaseEnum.PostVote) {
      throw new CommandValidationError('Cannot confirm vote until after the vote is done.');
    }
    return true;
  }

  execute({ sessionId, options } = this.payload) {
    for (let id in this.state.players) {
      this.state.players[id].handRaised = false;
    }
    this.state.votingSchema.voteCount = options.voteCount;
    if (
      this.state.votingSchema.voteCount >= Math.round(this.state.livingPlayerCount / this.state.votingSchema.voteCount)
    ) {
      if (this.state.votingSchema.voteCount > this.state.votingSchema.votesToExecute) {
        this.state.votingSchema.playerToBeExecutedId = this.state.votingSchema.nominatedPlayerId;
        this.state.votingSchema.votesToExecute = this.state.votingSchema.voteCount;
      } else if (this.state.votingSchema.voteCount === this.state.votingSchema.votesToExecute) {
        this.state.votingSchema.playerToBeExecutedId = null;
      }
    }
    this.state.votingSchema.reset();
  }
}
