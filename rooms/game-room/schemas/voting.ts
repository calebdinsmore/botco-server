import { Player } from './player';
import { Schema, type } from '@colyseus/schema';
import { VotePhaseEnum } from './enum/vote-phase.enum';

export class Voting extends Schema {
  @type('string')
  votePhase: VotePhaseEnum = VotePhaseEnum.NoVote;

  @type('string')
  nominatedPlayerId: string;

  @type('string')
  highlightedPlayerId: string;

  @type('number')
  voteCount: number = 0;

  @type('string')
  playerToBeExecutedId: string;

  @type('number')
  votesToExecute: number = 0;

  beginVote: boolean = false;
  stopVote: boolean = false;
  voteInProgress: boolean = false;

  reset(full = false) {
    this.votePhase = VotePhaseEnum.NoVote;
    this.nominatedPlayerId = null;
    this.highlightedPlayerId = null;
    this.voteCount = 0;
    this.voteInProgress = false;
    this.stopVote = false;
    this.beginVote = false;
    if (full) {
      this.votesToExecute = 0;
      this.playerToBeExecutedId = null;
    }
  }
}
