import { Character } from '../../character';
import { CharacterTypeEnum } from '../../enum/character-type.enum';

export class Recluse extends Character {
  constructor() {
    super();
    this.name = 'Recluse';
    this.rulesText = 'You might register as evil & as a Minion or Demon, even if dead.';
    this.image = '/assets/images/characters/tb/Recluse.png';
    this.characterType = CharacterTypeEnum.Outsider;
  }
}
