import { ChatRoom } from './../../../schemas/chat-room';
import { Player } from './../../../schemas/player';
import { CommandValidationError } from './../../../util/command-validation-error';
import { Command } from '@colyseus/command';
import { GameState } from '../../../schemas';
import { isDefined } from '../../../util/util-functions';
import * as _ from 'lodash';
import { SendChatMessagePayloadDto } from './dto/send-chat-message-payload.dto';

export class SendChatMessageCommand extends Command<
  GameState,
  { sessionId: string; options: SendChatMessagePayloadDto }
> {
  validate({ sessionId, options } = this.payload) {
    if (sessionId === this.state.storyteller.playerId) {
      if (isDefined(options.toPlayerId) && this.state.players[options.toPlayerId]) {
        return true;
      }
      throw new CommandValidationError('Malformed command.');
    } else {
      if (options.toPlayerId !== this.state.storyteller.playerId) {
        throw new CommandValidationError('You may only send messages to the Storyteller.');
      }
      return true;
    }
  }

  execute({ sessionId, options } = this.payload) {
    let toPlayer: Player;
    let fromPlayer: Player;
    if (sessionId === this.state.storyteller.playerId) {
      fromPlayer = this.state.storyteller;
      toPlayer = this.state.players[options.toPlayerId];
    } else {
      fromPlayer = this.state.players[sessionId];
      toPlayer = this.state.storyteller;
    }
    if (!fromPlayer.chatRooms[options.toPlayerId]) {
      fromPlayer.chatRooms[options.toPlayerId] = new ChatRoom(options.toPlayerId);
    }
    if (!toPlayer.chatRooms[fromPlayer.playerId]) {
      toPlayer.chatRooms[fromPlayer.playerId] = new ChatRoom(fromPlayer.playerId);
    }
    const fromPlayerChatRoom = fromPlayer.chatRooms[options.toPlayerId] as ChatRoom;
    const toPlayerChatRoom = toPlayer.chatRooms[fromPlayer.playerId] as ChatRoom;
    fromPlayerChatRoom.addMessage(fromPlayer.playerId, options.content);
    toPlayerChatRoom.addMessage(fromPlayer.playerId, options.content);
    toPlayerChatRoom.hasUnread = true;
  }
}
