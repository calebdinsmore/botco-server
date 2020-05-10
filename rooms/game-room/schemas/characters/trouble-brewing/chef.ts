import { Character } from '../../character';
import { CharacterTypeEnum } from '../../enum/character-type.enum';

export class Chef extends Character {
  constructor() {
    super();
    this.name = 'Chef';
    this.rulesText = 'You start knowing how many pairs of evil players there are.';
    this.image = '/assets/images/characters/tb/Chef.png';
    this.characterType = CharacterTypeEnum.Townsfolk;
  }
}
