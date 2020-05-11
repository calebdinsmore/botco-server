import {
  Washerwoman,
  Librarian,
  Investigator,
  Chef,
  Empath,
  FortuneTeller,
  Undertaker,
  Monk,
  Ravenkeeper,
  Virgin,
  Slayer,
  Soldier,
  Mayor,
  Butler,
  Drunk,
  Recluse,
  Saint,
  Poisoner,
  Spy,
  ScarletWoman,
  Baron,
  Imp,
} from './../trouble-brewing';
import { CharacterSet } from '../character-set';
import { CharacterSetEnum } from '../../enum/character-set.enum';

export class TroubleBrewingSet extends CharacterSet {
  constructor() {
    super(
      [
        new Washerwoman(),
        new Librarian(),
        new Investigator(),
        new Chef(),
        new Empath(),
        new FortuneTeller(),
        new Undertaker(),
        new Monk(),
        new Ravenkeeper(),
        new Virgin(),
        new Slayer(),
        new Soldier(),
        new Mayor(),
        new Butler(),
        new Drunk(),
        new Recluse(),
        new Saint(),
        new Poisoner(),
        new Spy(),
        new ScarletWoman(),
        new Baron(),
        new Imp(),
      ],
      CharacterSetEnum.TroubleBrewing,
      '/assets/images/sets/tb.png'
    );
  }
}
