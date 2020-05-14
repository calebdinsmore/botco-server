import { Room, Client } from 'colyseus.js';
import { GameState, Player } from '../rooms/game-room/schemas';
import { ChatRoom } from '../rooms/game-room/schemas/chat-room';
import { SendChatMessagePayloadDto } from '../rooms/game-room/commands/actions/in-game/dto/send-chat-message-payload.dto';
import { CommandsEnum } from '../rooms/game-room/commands/commands.enum';

export function requestJoinOptions(this: Client, i: number) {
  return { requestNumber: i, username: generateRoomCode() };
}

export function onJoin(this: Room) {
  console.log(this.sessionId, 'joined.');
}

export function onMessage(this: Room, message: any) {
  console.log(this.sessionId, 'received:', message);
}

export function onLeave(this: Room) {
  console.log(this.sessionId, 'left.');
}

export function onError(this: Room, err: any) {
  console.log(this.sessionId, '!! ERROR !!', err.message);
}

export function onStateChange(this: Room, state: GameState) {
  console.log(this.sessionId, 'new state:', state);
}

function generateRoomCode(length = 6) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}
