import * as _ from 'lodash';
import { Command } from '@colyseus/command';
import { GameState } from '../../../../schemas';
import { VotePhaseEnum } from '../../../../schemas/enum/vote-phase.enum';

export class StopVoteCommand extends Command<GameState> {
  execute() {
    this.state.votingSchema.highlightedPlayerId = null;
    this.state.votingSchema.votePhase = VotePhaseEnum.PostVote;
  }
}
