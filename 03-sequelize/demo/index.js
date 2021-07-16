const express = require('express');
const { db, Op, Player, Team } = require('./db.js');

const server = express();

server.use(express.json());

server.post('/players', async (req, res) => {
  const { firstName, lastName, username, birthday, status, skill } = req.body;
  try {
    const newPlayer = await Player.create({
      firstName,
      lastName,
      username,
      birthday,
      status,
      skill
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
  res.json(players.length ? players : 'No players found');
});

server.get('/players/attributes', async (req, res) => {
  const { attributes } = req.body;
  const players = await Player.findAll({
    attributes
  });
  res.json(players.length ? players : 'No players found');
});

server.get('/players/filters/and', async (req, res) => {
  const players = await Player.findAll({
    where: req.body
  });
  res.json(players.length ? players : 'No players found');
});

server.get('/players/filters/or', async (req, res) => {
  const players = await Player.findAll({
    where: {
      [Op.or]: req.body
    }
  });
  res.json(players.length ? players : 'No players found');
});

server.get('/players/id/:id', async (req, res) => {
  const { id } = req.params;
  const player = await Player.findByPk(id);
  res.json(player || 'Player not found');
});

server.get('/players/findorcreate', async (req, res) => {
  const { firstName, lastName, username, birthday, status, skill } = req.body;
  const [player, created] = await Player.findOrCreate({
    where: {username},
    defaults: {
      firstName,
      lastName,
      birthday,
      status,
      skill
    }
  });
  res.json({created: created, player});
});

server.get('/players/ordered', async (req, res) => {
  const { attribute, order } = req.query;
  const players = await Player.findAll({
    where: {skill: {[Op.not]: null}},
    order: [
      [attribute, order]
    ]
    // order: db.col(attribute)
  });
  res.json(players.length ? players : 'No players found');
});

server.get('/players/group', async (req, res) => {
  const { attributeGroup, attributeFn, fn } = req.query;
  const stats = await Player.findAll({
    attributes: [
      attributeGroup,
      [db.fn(fn, db.col(attributeFn)), fn]
    ],
    group: [attributeGroup]
  });
  res.json(stats.length ? stats : 'No players found');
});

server.get('/players/:username', async (req, res) => {
  const { username } = req.params;
  const player = await Player.findOne({
    where: {username}
  });
  res.json(player || 'Player not found');
});

server.put('/players', async (req, res) => {
  const { persist } = req.query;
  const { username, status } = req.body;
  try {
    const player = await Player.findOne({
      where: {username}
    });
    player.status = status;
    if(persist) await player.save();
    // console.log(player);
    // console.log(player.toJSON());
    res.json(player);
  } catch (error) {
    res.send(error);
  }
});

server.put('/players/all', async (req, res) => {
  const response = await Player.update(
    { skill: 50 },
    {
      where: {skill: {[Op.is]: null}}
    }
  );
  res.send(`${response} players updated`);
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

server.use('/', (req, res) => {
  res.status(404).send('Resource not found');
});

server.listen(3000, () => {
  console.log('Server running on port 3000');
  db.sync();
});