import { CommandValidationError } from '../../../../util/command-validation-error';
import { Command } from '@colyseus/command';
import { GameState } from '../../../../schemas';
import { ControlShotClockPayloadDto } from './dto/control-shot-clock-payload.dto';
import * as _ from 'lodash';
import { isDefined } from '../../../../util/util-functions';
import { ShotClockActionEnum } from './enum/shot-clock-action.enum';

export class ControlShotClockCommand extends Command<
  GameState,
  { sessionId: string; options: ControlShotClockPayloadDto }
> {
  validate({ sessionId, options } = this.payload) {
    if (!isDefined(options.action)) {
      throw new CommandValidationError('Must specify action.');
    }
    switch (options.action) {
      case ShotClockActionEnum.Start:
        if (!options.seconds || options.seconds <= 0) {
          throw new CommandValidationError('Shot clock seconds must be defined and greater than 0.');
        }
        break;
      case ShotClockActionEnum.Resume:
        if (!this.state.shotClockIsPaused) {
          throw new CommandValidationError('Shot clock is not paused.');
        }
        break;
      case ShotClockActionEnum.Pause:
        if (this.state.shotClockIsPaused) {
          throw new CommandValidationError('Shot clock is paused.');
        }
        break;
      case ShotClockActionEnum.Stop:
        break;
      default:
        throw new CommandValidationError('Invalid shot clock action.');
    }
    if (sessionId !== this.state.storyteller?.playerId) {
      throw new CommandValidationError('Only the Storyteller can control the shot clock.');
    }
    return true;
  }

  execute({ options } = this.payload) {
    switch (options.action) {
      case ShotClockActionEnum.Start:
        this.state.shotClockSeconds = options.seconds;
        this.state.startShotClock = true;
        break;
      case ShotClockActionEnum.Pause:
        this.state.shotClockIsPaused = true;
        break;
      case ShotClockActionEnum.Resume:
        this.state.shotClockIsPaused = false;
        break;
      case ShotClockActionEnum.Stop:
        this.state.stopShotClock = true;
        break;
    }
  }
}
