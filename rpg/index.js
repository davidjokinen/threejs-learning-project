console.log('test');


import { BaseServer } from './server';
import { BaseClient } from './client';

const server = new BaseServer();

const client = new BaseClient();
client.connect(server);