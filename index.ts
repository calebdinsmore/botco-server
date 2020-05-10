require('dotenv').config();

import http from 'http';
import express from 'express';
import cors from 'cors';
import { Server } from 'colyseus';
import { monitor } from '@colyseus/monitor';
import basicAuth from 'express-basic-auth';

import { GameRoom } from './rooms/game-room/game-room';

const port = Number(process.env.PORT || 2567);
const app = express();

app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const gameServer = new Server({
  server,
});

// register your room handlers
gameServer.define('game_room', GameRoom);

/**
 * Register @colyseus/social routes
 *
 * - uncomment if you want to use default authentication (https://docs.colyseus.io/authentication/)
 * - also uncomment the import statement
 */
// app.use("/", socialRoutes);
if (!process.env.MONITOR_PASSWORD) {
  throw new Error('Need to define an admin monitor password');
}

const basicAuthMiddleware = basicAuth({
  users: {
    admin: process.env.MONITOR_PASSWORD,
  },
  challenge: true,
});

// register colyseus monitor AFTER registering your room handlers
app.use('/colyseus', basicAuthMiddleware, monitor());

gameServer.listen(port);
console.log(`Listening on ws://localhost:${port}`);
