


export class BaseClient {
  constructor() {
    this.server = null;
  }

  connect(server) {
    this.server = server;
    server.add(this);
  }

  send(events) {
    if (this.server) {
      this.server.get(events);
    }
  }

  get(events) {

  } 
}
