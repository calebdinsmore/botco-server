import { Schema, type } from '@colyseus/schema';

export class BooleanSchema extends Schema {
  constructor(value: boolean) {
    super();
    this.value = value;
  }

  @type('boolean')
  value: boolean;
}
