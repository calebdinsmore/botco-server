import { Schema, type } from '@colyseus/schema';
export class ChatMessage extends Schema {
  constructor(authorId: string, content: string) {
    super();
    this.authorId = authorId;
    this.content = content;
    this.timestamp = new Date().getTime();
  }

  @type('string')
  authorId: string;

  @type('string')
  content: string;

  @type('number')
  timestamp: number;
}
