import { Voting } from './voting';
import { GameMeta } from './game-meta';
import { GamePhaseEnum } from './enum/game-phase.enum';
import { Schema, type, MapSchema, ArraySchema, filter } from '@colyseus/schema';
import { Player } from './player';
import { ReminderToken } from './reminder-token';
import { Client } from 'colyseus';
import { CharacterSetEnum } from './enum/character-set.enum';
import * as _ from 'lodash';

export class GameState extends Schema {
  @type('boolean')
  isLocked: boolean = false;

  @type({ map: Player })
  players = new MapSchema<Player>();

  @type(Player)
  storyteller: Player;

  @type('boolean')
  isDay: boolean = true;

  @type(GameMeta)
  gameMeta: GameMeta = new GameMeta();

  @type('string')
  gamePhase: GamePhaseEnum = GamePhaseEnum.PreGame;

  @type('string')
  nextGamePhase: GamePhaseEnum = GamePhaseEnum.FirstNight;

  @filter(function (this: GameState, client: Client, value?: GameState['reminderTokens'], root?: Schema) {
    return client.sessionId === this.storyteller?.playerId;
  })
  @type([ReminderToken])
  reminderTokens = new ArraySchema<ReminderToken>();

  @type('boolean')
  charactersDistributed: boolean = false;

  @type(Voting)
  votingSchema: Voting = new Voting();

  @type('string')
  canSeeGrimoirePlayerId: string;

  @type('string')
  characterSet: CharacterSetEnum;

  @type('number')
  shotClockSeconds: number;

  @type('boolean')
  shotClockIsPaused: boolean;

  startShotClock: boolean;
  stopShotClock: boolean;

  maxPlayerCount = 16;

  fallbackIcons: string[] = [
    'em-male-student',
    'em-male-office-worker',
    'em-male-farmer',
    'em-male-construction-worker',
    'em-male-singer',
    'em-male-mechanic',
    'em-male-factory-worker',
    'em-male-astronaut',
    'em-female-firefighter',
    'em-female-pilot',
    'em-female-teacher',
    'em-female-artist',
    'em-female-doctor',
    'em-female-judge',
    'em-female-scientist',
    'em-female-guard',
  ].sort(() => Math.random() - 0.5);

  get seatMap(): Map<number, Player> {
    const seatMap = new Map<number, Player>();
    for (let id in this.players) {
      const player: Player = this.players[id];
      seatMap.set(player.seatNumber, player);
    }
    return seatMap;
  }

  get playersAsArray(): Player[] {
    const players = [];
    for (let id in this.players) {
      players.push(this.players[id]);
    }
    return players;
  }

  get livingPlayerCount() {
    return this.playersAsArray.filter((x) => !x.isDead).length;
  }

  deactivatePlayer(id: string) {
    if (id === this.storyteller?.playerId) {
      this.storyteller.inactive = true;
    } else if (this.players[id]) {
      this.players[id].inactive = true;
    }
    this.gameMeta.updateFromState(this);
  }

  removePlayer(id: string) {
    if (id === this.storyteller?.playerId) {
      this.storyteller = null;
    } else if (this.players[id]) {
      this.fallbackIcons.push(this.players[id].fallbackIcon);
      this.reminderTokens.push(...this.players[id].reminderTokens);
      delete this.players[id];
      delete this.storyteller?.chatRooms[id];
    }
    this.gameMeta.updateFromState(this);
  }
}
