import { Schema, type } from '@colyseus/schema';
export class ChatMessage extends Schema {
  constructor(authorId: string, content: string) {
    super();
    this.authorId = authorId;
    this.content = content;
  }

  @type('string')
  authorId: string;

  @type('string')
  content: string;
}
