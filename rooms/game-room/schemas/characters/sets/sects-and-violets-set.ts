import { CharacterSetEnum } from '../../enum/character-set.enum';
import {
  Clockmaker,
  Dreamer,
  SnakeCharmer,
  Mathematician,
  Flowergirl,
  TownCrier,
  Oracle,
  Savant,
  Seamstress,
  Philosopher,
  Artist,
  Juggler,
  Sage,
  Mutant,
  Sweetheart,
  Barber,
  Klutz,
  EvilTwin,
  Witch,
  Cerenovus,
  PitHag,
  FangGu,
  Vigormortis,
  NoDashii,
  Vortox,
} from '../sects-and-violets';
import { CharacterSet } from '../character-set';

export class SectsAndVioletsSet extends CharacterSet {
  constructor() {
    super(
      [
        new Clockmaker(),
        new Dreamer(),
        new SnakeCharmer(),
        new Mathematician(),
        new Flowergirl(),
        new TownCrier(),
        new Oracle(),
        new Savant(),
        new Seamstress(),
        new Philosopher(),
        new Artist(),
        new Juggler(),
        new Sage(),
        new Mutant(),
        new Sweetheart(),
        new Barber(),
        new Klutz(),
        new EvilTwin(),
        new Witch(),
        new Cerenovus(),
        new PitHag(),
        new FangGu(),
        new Vigormortis(),
        new NoDashii(),
        new Vortox(),
      ],
      CharacterSetEnum.SectsAndViolets,
      '/assets/images/sets/snv.png'
    );
  }
}
