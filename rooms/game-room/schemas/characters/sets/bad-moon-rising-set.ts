import { CharacterSet } from '../character-set';
import {
  Grandmother,
  Sailor,
  Chambermaid,
  Exorcist,
  Innkeeper,
  Gambler,
  Gossip,
  Courtier,
  Professor,
  Minstrel,
  TeaLady,
  Pacifist,
  Fool,
  Tinker,
  Moonchild,
  Goon,
  Lunatic,
  Godfather,
  DevilsAdvocate,
  Assassin,
  Mastermind,
  Zombuul,
  Pukka,
  Shabaloth,
  Po,
} from '../bad-moon-rising';
import { CharacterSetEnum } from '../../enum/character-set.enum';

export class BadMoonRisingSet extends CharacterSet {
  constructor() {
    super(
      [
        new Grandmother(),
        new Sailor(),
        new Chambermaid(),
        new Exorcist(),
        new Innkeeper(),
        new Gambler(),
        new Gossip(),
        new Courtier(),
        new Professor(),
        new Minstrel(),
        new TeaLady(),
        new Pacifist(),
        new Fool(),
        new Tinker(),
        new Moonchild(),
        new Goon(),
        new Lunatic(),
        new Godfather(),
        new DevilsAdvocate(),
        new Assassin(),
        new Mastermind(),
        new Zombuul(),
        new Pukka(),
        new Shabaloth(),
        new Po(),
      ],
      CharacterSetEnum.BadMoonRising,
      '/assets/images/sets/bmr.png'
    );
  }
}
