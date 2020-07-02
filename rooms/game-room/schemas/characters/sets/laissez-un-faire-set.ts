import { CharacterSet } from '../character-set';
import { CharacterSetEnum } from '../../enum/character-set.enum';
import { Balloonist } from '../laissez-un-faire/balloonist';
import { Amnesiac } from '../laissez-un-faire/amnesiac';
import { Cannibal } from '../laissez-un-faire/cannibal';
import { Artist, Savant, Mutant } from '../sects-and-violets';
import { Fisherman } from '../laissez-un-faire/fisherman';
import { Lunatic } from '../bad-moon-rising';
import { Goblin } from '../laissez-un-faire/goblin';
import { Widow } from '../laissez-un-faire/widow';
import { Leviathan } from '../laissez-un-faire/leviathan';

export class LaissezUnFaireSet extends CharacterSet {
  constructor() {
    super(
      [
        new Balloonist(),
        new Amnesiac(),
        new Cannibal(),
        new Artist(),
        new Savant(),
        new Fisherman(),
        new Lunatic(),
        new Mutant(),
        new Goblin(),
        new Widow(),
        new Leviathan(),
      ],
      CharacterSetEnum.LaissezUnFaire,
      '/assets/images/sets/luf.png'
    );
  }
}
