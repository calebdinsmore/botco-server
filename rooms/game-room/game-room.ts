import { RevealGrimoirePayloadDto } from './commands/actions/in-game/dto/reveal-grimoire-payload.dto';
import { UpdatePlayerPayloadDto } from './commands/actions/in-game/dto/update-player-payload.dto';
import { UpdatePlayerCommand } from './commands/actions/in-game/update-player-command';
import { MarkChatReadCommand } from './commands/actions/in-game/mark-chat-read-command';
import { SendChatMessageCommand } from './commands/actions/in-game/send-chat-message-command';
import { ConfirmVoteCommand } from './commands/actions/in-game/voting/confirm-vote-command';
import { StopVoteCommand } from './commands/actions/in-game/voting/stop-vote-command';
import { BeginVoteCommand } from './commands/actions/in-game/voting/begin-vote-command';
import { NominatePlayerCommand } from './commands/actions/in-game/voting/nominate-player-command';
import { BeginNextPhaseCommand } from './commands/actions/in-game/begin-next-phase.command';
import { RemoveReminderTokenCommand } from './commands/actions/in-game/remove-reminder-token-command';
import { RecallReminderTokensCommand } from './commands/actions/in-game/recall-reminder-tokens-command';
import { AddReminderTokenCommand } from './commands/actions/in-game/add-reminder-token-command';
import { StaticGameData } from './schemas/static-game-data';
import { TroubleBrewingSet } from './schemas/characters/sets/trouble-brewing-set';
import { CommandsEnum } from './commands/commands.enum';
import { Dispatcher, Command } from '@colyseus/command';
import { JoinOptionsDto } from './commands/dto/join-options.dto';
import { Room, Client, Delayed } from 'colyseus';
import { GameState } from './schemas/game-state';
import { OnJoinCommand } from './commands';
import { SetPlayerSeatCommand } from './commands/actions/pre-game/set-player-seat-command';
import { Player } from './schemas';
import { SetCharactersCommand } from './commands/actions/pre-game/set-characters-command';
import { ToggleHandCommand } from './commands/actions/in-game/voting/toggle-hand-command';
import { ProcessNextVoteCommand } from './commands/actions/in-game/voting/increment-highlighted-player-command';
import { SetPlayerDeadStatusCommand } from './commands/actions/in-game/set-player-dead-status-command';
import { RevealGrimoireCommand } from './commands/actions/in-game/reveal-grimoire-command';
import * as _ from 'lodash';
import { ChangePlayerCharacterCommand } from './commands/actions/in-game/change-player-character-command';

export class GameRoom extends Room<GameState> {
  dispatcher = new Dispatcher(this);
  maxClients = 17;
  votingInterval: Delayed;

  async onCreate(options: any) {
    await this.guaranteeUniqueRoomCode();

    this.setState(new GameState());

    // register actions
    this.onMessage('*', (client, type, message) => {
      console.log('New Action', type, message);
      switch (type) {
        case CommandsEnum.SetPlayerSeat:
          this.dispatch(new SetPlayerSeatCommand(), client, { sessionId: client.sessionId, options: message });
          break;
        case CommandsEnum.SetCharacters:
          this.dispatch(new SetCharactersCommand(), client, { sessionId: client.sessionId, options: message });
          break;
        case CommandsEnum.AddReminderToken:
          this.dispatch(new AddReminderTokenCommand(), client, {
            sessionId: client.sessionId,
            options: message,
          });
          break;
        case CommandsEnum.RecallReminderTokens:
          this.dispatch(new RecallReminderTokensCommand(), client, { sessionId: client.sessionId });
          break;
        case CommandsEnum.RemoveReminderToken:
          this.dispatch(new RemoveReminderTokenCommand(), client, {
            sessionId: client.sessionId,
            options: message,
          });
          break;
        case CommandsEnum.BeginNextPhase:
          this.dispatch(new BeginNextPhaseCommand(), client, { sessionId: client.sessionId });
          break;
        case CommandsEnum.NominatePlayer:
          this.dispatch(new NominatePlayerCommand(), client, { sessionId: client.sessionId, options: message });
          break;
        case CommandsEnum.BeginVote:
          this.dispatch(new BeginVoteCommand(), client, { sessionId: client.sessionId });
          if (this.state.votingSchema.beginVote) {
            this.startVote();
          }
          break;
        case CommandsEnum.ToggleHand:
          this.dispatch(new ToggleHandCommand(), client, { sessionId: client.sessionId });
          break;
        case CommandsEnum.ConfirmVote:
          this.dispatch(new ConfirmVoteCommand(), client, { sessionId: client.sessionId, options: message });
          break;
        case CommandsEnum.SetPlayerDeadStatus:
          this.dispatch(new SetPlayerDeadStatusCommand(), client, { sessionId: client.sessionId, options: message });
          break;
        case CommandsEnum.SendChatMessage:
          this.dispatch(new SendChatMessageCommand(), client, { sessionId: client.sessionId, options: message });
          break;
        case CommandsEnum.MarkChatRead:
          this.dispatch(new MarkChatReadCommand(), client, { sessionId: client.sessionId, options: message });
          break;
        case CommandsEnum.UpdatePlayer:
          this.dispatch(new UpdatePlayerCommand(), client, { sessionId: client.sessionId, options: message });
          break;
        case CommandsEnum.RevealGrimoire:
          const typedOptions = message as RevealGrimoirePayloadDto;
          const newRevealedClient = _.find(this.clients, (x) => x.sessionId === typedOptions.playerId);
          const oldRevealedClient = _.find(this.clients, (x) => x.sessionId === this.state.canSeeGrimoirePlayerId);
          this.dispatch(new RevealGrimoireCommand(), client, {
            newRevealedClient,
            oldRevealedClient,
            sessionId: client.sessionId,
            options: message,
          });
          break;
        case CommandsEnum.ChangePlayerCharacter:
          this.dispatch(new ChangePlayerCharacterCommand(), client, { sessionId: client.sessionId, options: message });
          break;
      }
    });
  }

  onAuth(client: Client, options: JoinOptionsDto) {
    if (options.isStoryteller && this.state?.storyteller?.playerId) {
      client.send('error', 'Game already has a Storyteller.');
      return false;
    } else if (!options.isStoryteller) {
      if (options.username.length > 12 || options.username.length < 2) {
        client.send('error', 'Username must be between 2 and 12 characters.');
        return false;
      }

      for (let id in this.state.players) {
        const player: Player = this.state.players[id];
        if (player.username.toLowerCase().trim() === options.username.toLowerCase().trim()) {
          client.send('error', 'Username already in use in room. Try a different name.');
          return false;
        }
      }
    }
    return true;
  }

  onJoin(client: Client, options: JoinOptionsDto) {
    this.dispatch(new OnJoinCommand(), client, { sessionId: client.sessionId, options });
    client.send('static_game_data', new StaticGameData());
  }

  async onLeave(client: Client, consented: boolean) {
    let player: Player;
    if (client.sessionId === this.state.storyteller?.playerId) {
      player = this.state.storyteller;
    } else {
      player = this.state.players[client.sessionId];
    }
    player.connected = false;

    try {
      if (consented) {
        throw new Error('consented leave');
      }

      // allow disconnected client to reconnect into this room until 20 seconds
      await this.allowReconnection(client, 60);

      // client returned! let's re-activate it.
      player.connected = true;
      client.send('static_game_data', new StaticGameData());
    } catch (e) {
      // 20 seconds expired. let's remove the client.
      console.log('Removing player', client.sessionId);
      this.state.removePlayer(client.sessionId);
    }
  }

  onDispose() {
    this.presence.hdel('roomIds', this.roomId);
    this.dispatcher.stop();
  }

  private dispatch<T extends Command>(command: T, client?: Client, payload?: T['payload']): void | Promise<unknown> {
    try {
      return this.dispatcher.dispatch(command, payload);
    } catch (e) {
      if (client) {
        client.send('error', `${e.name}: ${e.message}`);
      } else {
        this.broadcast('error', `${e.name}: ${e.message}`);
      }
    }
  }

  private async guaranteeUniqueRoomCode() {
    this.roomId = this.generateRoomCode();
    let exists = await this.presence.hget('roomIds', this.roomId);
    while (exists) {
      this.roomId = this.generateRoomCode();
      exists = await this.presence.hget('roomIds', this.roomId);
    }
    this.presence.hset('roomIds', this.roomId, 'true');
  }

  private generateRoomCode(length = 6) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }

  private startVote(): void {
    this.clock.start();
    this.state.votingSchema.beginVote = false;
    this.state.votingSchema.voteInProgress = true;
    this.votingInterval = this.clock.setInterval(() => {
      this.dispatch(new ProcessNextVoteCommand());
      if (this.state.votingSchema.stopVote) {
        this.dispatch(new StopVoteCommand());
        this.votingInterval.clear();
        this.clock.stop();
      }
    }, 2000);
  }
}
