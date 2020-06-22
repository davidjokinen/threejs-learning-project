

// State data
// ID 
// parent ID
// Data

// State actions
// INIT
// DESTROY

// Events 
const game = new Game();
// init event
const map = new Map();
// update event
// map.state.dispatch(updateTileImage(1, 4));
map.updateTileImage();

game.add(map)

State.setRoot(game);

State.on('sync').then((events) => {
  clients.send(events);
});

game.loop(() => {

  State.sync();
});


Entity.on('init').then((entity) => {

  });


State.onConnect((game) => {
  game

})

Map.state.run(INIT)




