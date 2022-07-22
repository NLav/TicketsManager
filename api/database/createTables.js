const models = [require('../routes/users/model'), require('../routes/tickets/model')];

async function createTables() {
  for (let i = 0; i < models.length; i++) {
    const model = models[i];
    await model.sync();
  }
}

createTables();
