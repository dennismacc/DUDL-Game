//These are all the view routes for your application
const router = require('express').Router();
//when a GET request is received on the root(/) route,
//render the home.handlebars view
router.get('/', (req, res) => {
  console.log(`🧑🏼‍💻 User is on home page`);
  res.render('home');
});

router.get(`/lobby/:roomid`, (req, res) => {
  //maybe we lookup record from db using roomid
  //
  console.log(`🕺🏼 User is in lobby`);
  //this will render the view lobby.handlebars
  res.render('lobby', {roomid: req.params.roomid, numPlayers: 54});
});

router.get('/gameRoom', (req, res) => {
  console.log(`🎮 User is in game room`);
  //this will render the view game_room.handlebars
  res.render('gameRoom');
})



module.exports = router;