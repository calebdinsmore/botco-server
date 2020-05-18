# Blood on the Clocktower Online Colyseus Server

## Disclaimers

* This project is completely fan-made and has no affiliation with Pandemonium Institute, the copyright holders for [Blood on the Clocktower](http://bloodontheclocktower.com/).
* Please consider supporting the game creators by pre-ordering a physical copy of the game at [their Kickstarter](https://www.kickstarter.com/projects/pandemoniuminstitute/blood-on-the-clocktower).

## Running for Development

```sh
npm install
npm run start
```

## Important Things to Know

### Design Philosophy

Can't really say it better than the creator of Colyseus, the library this server uses to manage state and handle networking, so here's a blurb from their [docs](https://docs.colyseus.io/)

> The authoritative game server mindset is quite simple. The Server validates the user actions, and clients are dumb visual representations of the current game state.
>
> The server should take care of all data involved in your game, such as positioning, speeds, collisions, etc.
>
> Making multiplayer games is usually tricky because your gameplay must take the multiple delays into account - the other clients sending data to the server, and the server sending data back to all clients. It's the art of faking something that has already happened is actually happening as the current player sees and plays the game.
>
> Here's how the "multiplayer game loop" looks like on Colyseus:
>
> * Client sends a message to the server, requesting to change its state.
> * The input must be validated by your room handler.
> * The room state is updated.
> * All clients receive the latest version of the game state.
> * The visual representation of the game state is updated.

How this is implemented in this app is that any action intended to mutate state is implemented via a Command, which the primary room handler ([game-room.ts](https://github.com/calebdinsmore/botco-server/blob/master/rooms/game-room/game-room.ts)) listens for. When the server receives a command, it validates and executes it, mutating the state. That updated state is sent to all connected clients, which update their views appropriately.

### Important Classes

#### [GameRoom](https://github.com/calebdinsmore/botco-server/blob/master/rooms/game-room/game-room.ts)

This is the single room handler in the server. Lifecycle hooks for the room can be found here, and it's where Commands are "registered" (i.e. added to the large switch statement in onCreate).

#### [GameState](https://github.com/calebdinsmore/botco-server/blob/master/rooms/game-room/schemas/game-state.ts)

This is the top-level state schema. (Almost) everything you need to know about a game is contained within it (see below).

#### [StaticGameData](https://github.com/calebdinsmore/botco-server/blob/master/rooms/game-room/schemas/static-game-data.ts)

This contains the static character set information. This isn't included in the state to keep state size down. Instead it's sent to clients once on join/reconnect.
