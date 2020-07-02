import { Room, Client } from 'colyseus.js';
import { GameState, Player } from '../rooms/game-room/schemas';
import { ChatRoom } from '../rooms/game-room/schemas/chat-room';
import { SendChatMessagePayloadDto } from '../rooms/game-room/commands/actions/in-game/dto/send-chat-message-payload.dto';
import { CommandsEnum } from '../rooms/game-room/commands/commands.enum';

export function requestJoinOptions(this: Client, i: number) {
  return { requestNumber: i, username: getRandomName() };
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

function getRandomName() {
  const names = [
    'Camila',
    'Mathew',
    'Lizabeth',
    'Neil',
    'Ivana',
    'Julie',
    'Nilsa',
    'Kindra',
    'Miyoko',
    'Sallie',
    'Kary',
    'Hyacinth',
    'Lamar',
    'Evangelina',
    'Emilia',
    'Abe',
    'Louann',
    'Mickie',
    'Son',
    'Marcell',
    'Susanna',
    'Libby',
    'Joye',
    'Lavonia',
    'Concepcion',
    'Kimberlie',
    'Johnathon',
    'Zelda',
    'Gwyneth',
    'Ethel',
    'Taylor',
    'Mazie',
    'Gaston',
    'Coretta',
    'Nancee',
    'Hermine',
    'Cordelia',
    'Tanya',
    'Malcolm',
    'Anastasia',
    'Buford',
    'Yoshie',
    'Arlyne',
    'Sterling',
    'Mirella',
    'Dawn',
    'Wilburn',
    'Tamesha',
    'Julee',
    'Eufemia',
  ];
  return names[Math.floor(Math.random() * names.length)];
}
