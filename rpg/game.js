
const USER_STATES = {
  WATCHING: 'WATCHING',
  PLAYING: 'PLAYING',
};

// TODO: replace this state garbage.
function addPlayer(state, player) {
  state.player.push({
    id: player.id,
    name: player.name,
    state: USER_STATES.WATCHING,
  });
  return state;
}

function joinGame(state, id) {
  state.players = state.players.map(player => {
    if (player.id === id) {
      player.state = USER_STATES.PLAYING;
    }
    return player;
  });
  state.entities.push({
    controller: id,
    position: {
      x: 3,
      y: 3,
    },
  });
  return state;
}

export class Game {
  constructor() {
    this.state = {
      players: [],
      turn: 0,
      map: [
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,1,0,0,0],
        [0,0,0,0,0,1,1,0,0,0],
        [0,0,0,0,1,1,0,0,0,0],
        [0,0,0,0,1,1,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
      ],
      entities: [

      ]
    };
  }

  addPlayer(player) {
    addPlayer(this.state, player);
  }

  send(data) {
    this.clients.map(client => client.get(data));
  }

  tick() {

  } 

  on() {
    
  }
}
