import { Player } from '../../../../schemas';

export interface UpdatePlayerPayloadDto {
  playerId: string;
  player: Partial<Player>;
  triggerAll: boolean;
}
