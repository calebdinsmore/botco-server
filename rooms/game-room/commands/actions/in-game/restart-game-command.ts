import { CommandValidationError } from './../../../util/command-validation-error';
import { Command } from '@colyseus/command';
import { GameState, Player } from '../../../schemas';
import { Room } from 'colyseus';
import { ChatRoom } from '../../../schemas/chat-room';
import { ClientMessageTypeEnum } from '../../../util/client-messages/enum/client-message-type.enum';

interface NeededPlayerInfo {
  playerId: string;
  username: string;
  isStoryteller: boolean;
}

export class RestartGameCommand extends Command<GameState, { sessionId: string; room: Room<GameState> }> {
  validate({ sessionId } = this.payload) {
    if (sessionId === this.state.storyteller?.playerId) {
      return true;
    }
    throw new CommandValidationError('Only the Storyteller can restart the game.');
  }

  execute({ room } = this.payload) {
    const playerInfo: NeededPlayerInfo[] = [];
    playerInfo.push({
      playerId: this.state.storyteller?.playerId,
      username: this.state.storyteller?.username,
      isStoryteller: true,
    } as NeededPlayerInfo);
    for (let id in this.state.players) {
      playerInfo.push({
        playerId: id,
        username: this.state.players[id].username,
        isStoryteller: false,
      });
    }

    const newState = new GameState();
    for (const info of playerInfo) {
      this.addPlayer(info, newState);
    }
    room.setState(newState);
    room.broadcast(ClientMessageTypeEnum.RefreshPage, {});
  }

  private addPlayer(info: NeededPlayerInfo, newState: GameState) {
    const player = new Player();
    player.playerId = info.playerId;
    player.username = info.username;
    player.seatNumber = Object.keys(newState.players).length;
    const seatMap = newState.seatMap;
    for (let i = 0; i < 17; i++) {
      if (!seatMap.get(i)) {
        player.seatNumber = i;
        break;
      }
    }
    player.isStoryteller = !!info.isStoryteller;
    if (player.isStoryteller) {
      newState.storyteller = player;
      newState.storyteller.fallbackIcon = 'em-mage';
    }
    player.storytellerSessionId = newState.storyteller?.playerId;
    if (!player.isStoryteller) {
      player.fallbackIcon = newState.fallbackIcons.pop();
      newState.players[info.playerId] = player;
      newState.storyteller.chatRooms[player.playerId] = new ChatRoom(player.playerId);
      player.chatRooms[newState.storyteller?.playerId] = new ChatRoom(newState.storyteller?.playerId);
    }

    newState.gameMeta.updateFromState(newState);
  }
}
