


export class BaseClient {
  constructor() {
    this.server = null;
    this.onEvents = [];
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
    this.onEvents.map(promise => promise(events));
  }

  on(promise) {
    this.onEvents.push(promise);
  }
}
