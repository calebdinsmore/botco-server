import { ChatRoom } from './../../schemas/chat-room';
import { CommandValidationError } from './../../util/command-validation-error';
import { JoinOptionsDto } from '../dto';
import { Command } from '@colyseus/command';
import { GameState, Player } from '../../schemas';

export class OnJoinCommand extends Command<GameState, { sessionId: string; options: JoinOptionsDto }> {
  validate({} = this.payload) {
    // validation done in onAuth
    return true;
  }

  execute({ sessionId, options } = this.payload) {
    if (options.spectator) {
      return;
    }
    const player = new Player();
    player.playerId = sessionId;
    player.username = options.username;
    player.seatNumber = Object.keys(this.state.players).length;
    const seatMap = this.state.seatMap;
    for (let i = 0; i < 17; i++) {
      if (!seatMap.get(i)) {
        player.seatNumber = i;
        break;
      }
    }
    player.isStoryteller = !!options.isStoryteller;
    if (player.isStoryteller) {
      this.state.storyteller = player;
      this.state.storyteller.fallbackIcon = 'em-mage';
    }
    player.storytellerSessionId = this.state.storyteller?.playerId;
    if (!player.isStoryteller) {
      player.fallbackIcon = this.state.fallbackIcons.pop();
      this.state.players[sessionId] = player;
      this.state.storyteller.chatRooms[player.playerId] = new ChatRoom(player.playerId);
      player.chatRooms[this.state.storyteller?.playerId] = new ChatRoom(this.state.storyteller?.playerId);
    }

    this.state.gameMeta.updateFromState(this.state);
  }
}
