import { ShotClockActionEnum } from '../enum/shot-clock-action.enum';

export interface ControlShotClockPayloadDto {
  action: ShotClockActionEnum;
  seconds: number;
}
