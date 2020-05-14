import { CommandValidationError } from './../../../util/command-validation-error';
import { Command } from '@colyseus/command';
import { GameState } from '../../../schemas';
import { GamePhaseEnum } from '../../../schemas/enum/game-phase.enum';

export class BeginNextPhaseCommand extends Command<GameState, { sessionId: string }> {
  validate({ sessionId } = this.payload) {
    if (sessionId === this.state.storyteller?.playerId) {
      if (this.state.gamePhase === GamePhaseEnum.PreGame && !this.state.charactersDistributed) {
        throw new CommandValidationError('Cannot proceed to the First Night without distributing characters.');
      }
      return true;
    }
    throw new CommandValidationError('Only the Storyteller can issue this command.');
  }

  execute({} = this.payload) {
    switch (this.state.gamePhase) {
      case GamePhaseEnum.PreGame:
        this.state.gamePhase = GamePhaseEnum.FirstNight;
        this.state.nextGamePhase = GamePhaseEnum.Day;
        break;
      case GamePhaseEnum.FirstNight:
      case GamePhaseEnum.Night:
        this.state.gamePhase = GamePhaseEnum.Day;
        this.state.nextGamePhase = GamePhaseEnum.Night;
        break;
      case GamePhaseEnum.Day:
        this.state.gamePhase = GamePhaseEnum.Night;
        this.state.nextGamePhase = GamePhaseEnum.Day;
        this.state.votingSchema.reset(true);
        break;
    }
  }
}
