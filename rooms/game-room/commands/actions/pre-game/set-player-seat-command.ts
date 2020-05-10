import { CommandValidationError } from './../../../util/command-validation-error';
import { SetPlayerSeatDto } from './dto/set-player-seat.dto';
import { Command } from '@colyseus/command';
import { GameState } from '../../../schemas';
import { isDefined } from '../../../util/util-functions';

export class SetPlayerSeatCommand extends Command<GameState, { sessionId: string; options: SetPlayerSeatDto }> {
  validate({ sessionId, options } = this.payload) {
    if (isDefined(options.playerId) && isDefined(options.seatNumber)) {
      if (sessionId === this.state.storyteller.playerId) {
        return true;
      }
      throw new CommandValidationError('Only the Storyteller can arrange seats.');
    }
    throw new CommandValidationError('Command must include defined playerId and seatNumber.');
  }

  execute({ sessionId, options } = this.payload) {
    const seatMap = this.state.seatMap;
    if (seatMap.get(options.seatNumber)) {
      const oldNumber = this.state.players[options.playerId].seatNumber;
      this.state.players[options.playerId].seatNumber = options.seatNumber;
      seatMap.get(options.seatNumber).seatNumber = oldNumber;
    } else {
      this.state.players[options.playerId].seatNumber = options.seatNumber;
    }
  }
}
