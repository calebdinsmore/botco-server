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
import * as Sentry from '@sentry/node';
import { CommandValidationError } from './util/command-validation-error';
import { ClientMessageTypeEnum } from './util/client-messages/enum/client-message-type.enum';
import { RestartGameCommand } from './commands/actions/in-game/restart-game-command';
import { ToggleRoomLockCommand } from './commands/actions/in-game/toggle-room-lock-command';
import { RemovePlayerCommand } from './commands/actions/in-game/remove-player-command';

export class GameRoom extends Room<GameState> {
  dispatcher = new Dispatcher(this);
  maxClients = 17;
  votingInterval: Delayed;

  async onCreate(options: any) {
    await this.guaranteeUniqueRoomCode();

    this.setState(new GameState());

    // register actions
    this.onMessage('*', (client, type, message) => {
      // console.log('New Action', type, message);
      try {
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
            this.dispatch(new SendChatMessageCommand(), client, {
              sessionId: client.sessionId,
              clients: this.clients,
              options: message,
            });
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
            this.dispatch(new ChangePlayerCharacterCommand(), client, {
              sessionId: client.sessionId,
              options: message,
            });
            break;
          case CommandsEnum.RestartGame:
            this.dispatch(new RestartGameCommand(), client, { sessionId: client.sessionId, room: this });
            break;
          case CommandsEnum.ToggleRoomLock:
            this.dispatch(new ToggleRoomLockCommand(), client, { sessionId: client.sessionId });
            break;
          case CommandsEnum.RemovePlayer:
            const clientToDisconnect = _.find(this.clients, (x) => x.sessionId === options?.playerId);
            this.dispatch(new RemovePlayerCommand(), client, {
              sessionId: client.sessionId,
              client: clientToDisconnect,
              options: message,
            });
            break;
        }
      } catch (ex) {
        Sentry.captureException(ex);
      }
    });
  }

  onAuth(client: Client, options: JoinOptionsDto) {
    return this.validateJoinForAuth(options);
  }

  onJoin(client: Client, options: JoinOptionsDto) {
    this.dispatch(new OnJoinCommand(), client, { sessionId: client.sessionId, options });
    client.send(ClientMessageTypeEnum.StaticGameData, new StaticGameData());
  }

  async onLeave(client: Client, consented: boolean) {
    try {
      let player: Player;
      if (client.sessionId === this.state.storyteller?.playerId) {
        player = this.state.storyteller;
      } else if (this.state.players[client.sessionId]) {
        player = this.state.players[client.sessionId];
      } else {
        return; // no cleanup needed
      }
      player.connected = false;

      try {
        if (consented) {
          throw new Error('consented leave');
        }

        // allow disconnected client to reconnect into this room until 45 seconds
        await this.allowReconnection(client, 45);

        // client returned! let's re-activate it.
        player.connected = true;
        client.send(ClientMessageTypeEnum.StaticGameData, new StaticGameData());
      } catch (e) {
        // 45 seconds expired. let's remove the client.
        // console.log('Removing player', client.sessionId);
        this.state.deactivatePlayer(client.sessionId);
      }
    } catch (ex) {
      Sentry.captureException(ex);
      this.sendError(new Error('Error in onLeave'), client);
    }
  }

  onDispose() {
    this.presence.hdel('roomIds', this.roomId);
    this.dispatcher.stop();
  }

  private dispatch<T extends Command>(command: T, client?: Client, payload?: T['payload']): void | Promise<unknown> {
    try {
      const promise = this.dispatcher.dispatch(command, payload);
      if (promise) {
        promise.catch((e) => {
          if (!(e instanceof CommandValidationError)) {
            Sentry.captureException(e);
          }
          this.sendError(e, client);
        });
      }
    } catch (e) {
      if (!(e instanceof CommandValidationError)) {
        Sentry.captureException(e);
      }
      this.sendError(e, client);
    }
  }

  private validateJoinForAuth(options: JoinOptionsDto) {
    // regular join
    if (this.state.isLocked) {
      throw new Error('Room is locked.');
    }
    if (options.isStoryteller && this.state?.storyteller?.playerId) {
      throw new Error('A storyteller is already in ths room.');
    } else if (!options.isStoryteller) {
      if (options.username?.length > 12 || options.username?.length < 2) {
        throw new Error('Username must be between 2 and 12 characters long.');
      }

      for (let id in this.state.players) {
        const player: Player = this.state.players[id];
        if (player?.username?.toLowerCase().trim() === options.username?.toLowerCase().trim()) {
          throw new Error('Username already in use in this room.');
        }
      }
    }
    return true;
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

  private sendError(error: any, client?: Client) {
    if (client) {
      client.send('error', `${error.name}: ${error.message}`);
    } else {
      this.broadcast('error', `${error.name}: ${error.message}`);
    }
  }
}
