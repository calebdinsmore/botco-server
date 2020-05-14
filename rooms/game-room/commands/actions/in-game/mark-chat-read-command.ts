import { MarkChatReadPayloadDto } from './dto/mark-chat-read-payload.dto';
import { Player } from './../../../schemas/player';
import { CommandValidationError } from './../../../util/command-validation-error';
import { Command } from '@colyseus/command';
import { GameState } from '../../../schemas';
import { isDefined } from '../../../util/util-functions';
import * as _ from 'lodash';

export class MarkChatReadCommand extends Command<GameState, { sessionId: string; options: MarkChatReadPayloadDto }> {
  validate({ sessionId, options } = this.payload) {
    if (sessionId === this.state.storyteller?.playerId) {
      if (isDefined(options.toPlayerId) && this.state.players[options.toPlayerId]) {
        return true;
      }
      throw new CommandValidationError('Malformed command.');
    } else {
      if (options.toPlayerId !== this.state.storyteller?.playerId) {
        throw new CommandValidationError('You may only send messages to the Storyteller.');
      }
      return true;
    }
  }

  execute({ sessionId, options } = this.payload) {
    let player: Player;
    if (sessionId === this.state.storyteller?.playerId) {
      player = this.state.storyteller;
    } else {
      player = this.state.players[sessionId];
    }

    if (player.chatRooms[options.toPlayerId]) {
      player.chatRooms[options.toPlayerId].hasUnread = false;
    }
  }
}
