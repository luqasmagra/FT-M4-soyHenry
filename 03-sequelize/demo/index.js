const express = require('express');
const { db, Player, Team } = require('./db.js');

const server = express();

server.use(express.json());

server.post('/players', async (req, res) => {
  const { firstName, lastName, username, birthday, status } = req.body;
  try {
    const newPlayer = await Player.create({
      firstName,
      lastName,
      username,
      birthday,
      status
    });
    res.json(newPlayer);
  } catch (error) {
    res.send(error);
  }
});

server.get('/players', async (req, res) => {
  const { name } = req.query;
  const condition = name 
    ? {where: {firstName: name}}
    : {}
  const players = await Player.findAll(condition);
  // console.log(players);
  // console.log(players.map(p => p.toJSON()));
  res.json(players);
});

server.put('/players', async (req, res) => {
  const { persist } = req.query;
  const { username, status } = req.body;
  try {
    const player = await Player.findOne({
      where: {username}
    })
    player.status = status;
    if(persist) await player.save();
    // console.log(player);
    // console.log(player.toJSON());
    res.json(player);
  } catch (error) {
    res.send(error);
  }
});

server.get('/teams', async (req, res) => {
  const { name } = req.query;
  const condition = name 
  ? {where: {name}}
  : {}
  const teams = await Team.findAll(condition);
  res.json(teams);
});

server.post('/teams', async (req, res) => {
  const { name, one, two } = req.body;
  try {
    const team = await Team.create({
      name,
      one,
      two
    });
    res.json(team);
  } catch (error) {
    res.send(error);
  }
});

server.get('/', (req, res) => {
  res.send('DEMO Sequelize with Express');
});

server.listen(3000, () => {
  console.log('Server running on port 3000');
  db.sync({force: true});
});