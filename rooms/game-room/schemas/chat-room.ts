import { Schema, type, ArraySchema } from '@colyseus/schema';
import { ChatMessage } from './chat-message';

export class ChatRoom extends Schema {
  constructor(otherPlayerId: string) {
    super();
    this.otherPlayerId = otherPlayerId;
  }

  @type('string')
  otherPlayerId: string;

  @type([ChatMessage])
  messages = new ArraySchema<ChatMessage>();

  @type('boolean')
  hasUnread: boolean = false;

  addMessage(authorId: string, content: string) {
    this.messages.push(new ChatMessage(authorId, content));
  }
}
