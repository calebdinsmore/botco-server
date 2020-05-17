import { ChatRoom } from './../../../schemas/chat-room';
import { Player } from './../../../schemas/player';
import { CommandValidationError } from './../../../util/command-validation-error';
import { Command } from '@colyseus/command';
import { GameState } from '../../../schemas';
import { isDefined } from '../../../util/util-functions';
import * as _ from 'lodash';
import { SendChatMessagePayloadDto } from './dto/send-chat-message-payload.dto';
import { Client } from 'colyseus';
import { ClientMessageTypeEnum } from '../../../util/client-messages/enum/client-message-type.enum';
import { NotificationPayloadDto } from '../../../util/client-messages/dto/notification-payload.dto';
import { NotificationTypeEnum } from '../../../util/client-messages/enum/notification-type.enum';

export class SendChatMessageCommand extends Command<
  GameState,
  { sessionId: string; clients: Client[]; options: SendChatMessagePayloadDto }
> {
  validate({ sessionId, options } = this.payload) {
    if (sessionId === this.state.storyteller?.playerId) {
      if (isDefined(options.toPlayerId) && this.state.players[options.toPlayerId]) {
        if (options.content.length <= 200) {
          return true;
        }
        throw new CommandValidationError('Messages may only be up to 200 characters.');
      }
      throw new CommandValidationError('Malformed command.');
    } else {
      if (options.toPlayerId !== this.state.storyteller?.playerId) {
        throw new CommandValidationError('You may only send messages to the Storyteller.');
      }
      return true;
    }
  }

  execute({ sessionId, clients, options } = this.payload) {
    let toPlayer: Player;
    let fromPlayer: Player;
    if (sessionId === this.state.storyteller?.playerId) {
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
    if (fromPlayerChatRoom.messages.length > 20) {
      fromPlayerChatRoom.messages.splice(0, 1);
    }
    if (toPlayerChatRoom.messages.length > 20) {
      toPlayerChatRoom.messages.splice(0, 1);
    }
    if (!toPlayerChatRoom.hasUnread) {
      this.sendNotification(options.content, toPlayer.playerId, fromPlayer, clients);
    }
    toPlayerChatRoom.hasUnread = true;
  }

  private sendNotification(content: string, toPlayerId: string, fromPlayer: Player, clients: Client[]) {
    const client = _.find(clients, (x) => x.sessionId === toPlayerId);
    client?.send(ClientMessageTypeEnum.Notification, {
      type: NotificationTypeEnum.Info,
      summary: `New Message from ${fromPlayer.username}`,
      subject: fromPlayer.playerId,
      detail: content,
    } as NotificationPayloadDto);
  }
}
