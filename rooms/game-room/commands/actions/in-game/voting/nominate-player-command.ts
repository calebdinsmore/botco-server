import { Player } from './../../../../schemas/player';
import * as _ from 'lodash';
import { Command } from '@colyseus/command';
import { GameState } from '../../../../schemas';
import { NominatePlayerPayloadDto } from './dto/nominate-player-payload.dto';
import { CommandValidationError } from '../../../../util/command-validation-error';
import { VotePhaseEnum } from '../../../../schemas/enum/vote-phase.enum';

export class NominatePlayerCommand extends Command<
  GameState,
  { sessionId: string; options: NominatePlayerPayloadDto }
> {
  validate({ sessionId, options } = this.payload) {
    const nominatedPlayer: Player = this.state.players[options.nominatedPlayerId];
    const nominatingPlayer: Player = this.state.players[options.nominatingPlayerId];
    if (!nominatedPlayer || !nominatingPlayer) {
      throw new CommandValidationError('Player does not exist.');
    }
    if (sessionId !== this.state.storyteller.playerId) {
      throw new CommandValidationError('Only the Storyteller can process nominations.');
    }
    if (this.state.votingSchema.nominatedPlayerId) {
      throw new CommandValidationError('Cannot nominate another player with a nomination in progress.');
    }
    return true;
  }

  execute({ sessionId, options } = this.payload) {
    const nominatedPlayer: Player = this.state.players[options.nominatedPlayerId];
    const nominatingPlayer: Player = this.state.players[options.nominatingPlayerId];
    this.state.votingSchema.nominatedPlayerId = nominatedPlayer.playerId;
    nominatedPlayer.hasBeenNominated = true;
    nominatingPlayer.hasNominated = true;
    this.state.votingSchema.votePhase = VotePhaseEnum.PreVote;
  }
}
