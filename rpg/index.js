// Testing/trying out how to cleanly build multiplayer in mind. 
console.log('starting...');

import { BaseServer } from './server';
import { BaseClient } from './client';

import { Screen } from './screen';
import { Game } from './game';

const server = new BaseServer();

const game = new Game();

setInterval(() => {
  server.send(`Time ${Date.now()}`);
}, 100);

const screen1 = new Screen(screen => {
  const client = new BaseClient();
  client.connect(server);
  screen.log('Connected');
  client.on(events => {
    screen.log(events);
  });
});

const screen2 = new Screen(screen => {
  const client = new BaseClient();
  client.connect(server);
  screen.log('Connected');
  client.on(events => {
    screen.log(events);
  });
});