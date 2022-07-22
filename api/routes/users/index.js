const model = require('./model');
const User = require('./User');
const router = require('express').Router();

//Create
router.post('/', async (req, res) => {
  const user = new User(req.body);

  await user.create();

  res.send(user);
});

// Read All
router.get('/', async (req, res) => {
  const users = await model.findAll({ raw: true });

  res.send(users);
});

//Read One
router.get('/:idUser', async (req, res) => {
  const id = req.params.idUser;
  const user = new User({ id: id });

  await user.readOne();

  res.send(user);
});

//Update
router.put('/:idUser', async (req, res) => {
  const id = req.params.idUser;
  const user = new User(Object.assign({}, req.body, { id: id }));

  await user.update();

  res.send(user);
});

//Delete
router.delete('/:idUser', async (req, res) => {
  const id = req.params.idUser;
  const user = new User({ id: id });

  await user.delete();

  res.send(user);
});

module.exports = router;
