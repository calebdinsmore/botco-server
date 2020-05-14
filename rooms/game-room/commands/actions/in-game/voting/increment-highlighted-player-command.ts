import * as _ from 'lodash';
import { Command } from '@colyseus/command';
import { GameState, Player } from '../../../../schemas';
import { BooleanSchema } from '../../../../schemas/boolean-schema';

export class ProcessNextVoteCommand extends Command<GameState> {
  execute() {
    this.countVote();
    this.incrementHighlightedPlayer();
  }

  private countVote() {
    if (!this.state.votingSchema.highlightedPlayerId) return;
    const highlightedPlayer: Player = this.state.players[this.state.votingSchema.highlightedPlayerId];
    if (highlightedPlayer.handRaised) {
      this.state.votingSchema.voteCount++;
      highlightedPlayer.handLocked = true;
      if (!highlightedPlayer.canVote) {
        this.state.votingSchema.voteWarnings[highlightedPlayer.playerId] = new BooleanSchema(true);
      }
      if (highlightedPlayer.isDead) {
        highlightedPlayer.canVote = false;
      }
    }
  }

  private incrementHighlightedPlayer() {
    const seatMap = this.state.seatMap;
    const sortedSeatArray = [...seatMap].sort();
    let highlightedPlayer: Player;
    if (!this.state.votingSchema.highlightedPlayerId) {
      highlightedPlayer = this.state.players[this.state.votingSchema.nominatedPlayerId];
    } else {
      if (this.state.votingSchema.highlightedPlayerId === this.state.votingSchema.nominatedPlayerId) {
        this.state.votingSchema.stopVote = true;
        return;
      }
      highlightedPlayer = this.state.players[this.state.votingSchema.highlightedPlayerId];
    }
    const currentSeatNumber = highlightedPlayer.seatNumber;
    const playerCount = Object.keys(this.state.players).length;
    let nextPlayerIndex: number;
    for (let i = 0; i < playerCount; i++) {
      if (sortedSeatArray[i][0] === currentSeatNumber) {
        if (i + 1 === playerCount) {
          nextPlayerIndex = 0;
        } else {
          nextPlayerIndex = i + 1;
        }
        break;
      }
    }
    const nextPlayerId = sortedSeatArray[nextPlayerIndex][1].playerId;
    this.state.votingSchema.highlightedPlayerId = nextPlayerId;
  }
}
