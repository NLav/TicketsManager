const model = require('./model');
const Ticket = require('./Ticket');
const router = require('express').Router();

//Create
router.post('/', async (req, res) => {
  const ticket = new Ticket(req.body);

  await ticket.create();

  res.send(ticket);
});

//Read All
router.get('/', async (req, res) => {
  const tickets = await model.findAll({ raw: true });

  res.send(tickets);
});

//Read One
router.get('/:idTicket', async (req, res) => {
  const id = req.params.idTicket;
  const ticket = new Ticket({ id: id });

  await ticket.readOne();

  res.send(ticket);
});

//Update
router.put('/:idTicket', async (req, res) => {
  const id = req.params.idTicket;
  const ticket = new Ticket(Object.assign({}, req.body, { id: id }));

  await ticket.update();

  res.send(ticket);
});

//Delete
router.delete('/:idTicket', async (req, res) => {
  const id = req.params.idTicket;
  const ticket = new Ticket({ id: id });

  await ticket.delete();

  res.send(ticket);
});

module.exports = router;
