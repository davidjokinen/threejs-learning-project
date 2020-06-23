


export class BaseServer {
  constructor() {
    this.clients = [];
  }

  add(client) {
    console.log('Added Client')
    this.clients.push(client);
  }

  send(data) {
    this.clients.map(client => client.get(data));
  }

  get() {

  } 

  on() {
    
  }
}
