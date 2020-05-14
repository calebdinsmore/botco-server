import { ChatRoom } from './../../../schemas/chat-room';
import { Player } from './../../../schemas/player';
import { CommandValidationError } from './../../../util/command-validation-error';
import { Command } from '@colyseus/command';
import { GameState } from '../../../schemas';
import { isDefined } from '../../../util/util-functions';
import * as _ from 'lodash';
import { SendChatMessagePayloadDto } from './dto/send-chat-message-payload.dto';
import { UpdatePlayerPayloadDto } from './dto/update-player-payload.dto';

export class UpdatePlayerCommand extends Command<GameState, { sessionId: string; options: UpdatePlayerPayloadDto }> {
  validate({ sessionId, options } = this.payload) {
    if (sessionId === this.state.storyteller?.playerId) {
      if (isDefined(options.playerId) && this.state.players[options.playerId]) {
        return true;
      }
      throw new CommandValidationError('Malformed command.');
    }
    throw new CommandValidationError('Only the Storyteller can update players.');
  }

  execute({ options } = this.payload) {
    const player: Player = this.state.players[options.playerId];

    player.username = options.player.username ?? player.username;
    player.isDead = options.player.isDead ?? player.isDead;
    player.canVote = options.player.canVote ?? player.canVote;
    player.hasNominated = options.player.hasBeenNominated ?? player.hasNominated;
    player.hasBeenNominated = options.player.hasBeenNominated ?? player.hasBeenNominated;
    player.handRaised = options.player.handRaised ?? player.handRaised;
  }
}
