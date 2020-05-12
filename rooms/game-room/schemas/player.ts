import { GameState } from './game-state';
import { ChatRoom } from './chat-room';
import { Client } from 'colyseus';
import { Schema, type, filter, ArraySchema, MapSchema } from '@colyseus/schema';
import { Character } from './character';
import { ReminderToken } from './reminder-token';
import { GamePhaseEnum } from './enum/game-phase.enum';

export class Player extends Schema {
  @type('string')
  playerId: string; // contains the sessionId of the player with this Character

  @type('boolean')
  connected: boolean = true;

  @type('boolean')
  inactive: boolean = false;

  @type('string')
  username: string;

  @type('number')
  seatNumber: number;

  @filter(function (this: Player, client: Client, value?: Player['character'], root?: GameState) {
    return client.sessionId === this.storytellerSessionId || this.playerId === client.sessionId;
  })
  @type(Character)
  character: Character;

  @filter(function (this: Player, client: Client, value?: Player['reminderTokens'], root?: GameState) {
    return client.sessionId === this.storytellerSessionId;
  })
  @type([ReminderToken])
  reminderTokens = new ArraySchema<ReminderToken>();

  @filter(function (this: Player, client: Client, value?: Player['chatRooms'], root?: GameState) {
    return client.sessionId === this.playerId;
  })
  @type({ map: ChatRoom })
  chatRooms = new MapSchema<ChatRoom>();

  @type('string')
  fallbackIcon: string;

  @type('boolean')
  isDead: boolean = false;

  @type('boolean')
  canVote: boolean = true;

  @type('boolean')
  hasNominated: boolean = false;

  @type('boolean')
  hasBeenNominated: boolean = false;

  @type('boolean')
  handRaised: boolean = false;

  @type('boolean')
  handLocked: boolean = false;

  @type('boolean')
  isStoryteller: boolean = false;

  @type('string')
  storytellerSessionId: string;

  @type('number')
  refreshPlayerProp: number = 0;
}
