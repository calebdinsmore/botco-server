import { Player } from './player';
import { Schema, type, MapSchema } from '@colyseus/schema';
import { VotePhaseEnum } from './enum/vote-phase.enum';
import { BooleanSchema } from './boolean-schema';

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

  @type({ map: BooleanSchema })
  voteWarnings = new MapSchema<BooleanSchema>();

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
    this.voteWarnings = new MapSchema<BooleanSchema>();
    if (full) {
      this.votesToExecute = 0;
      this.playerToBeExecutedId = null;
    }
  }
}
