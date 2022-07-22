const model = require('./model');

class Ticket {
  constructor({
    id,
    subject,
    priority,
    description,
    status,
    userId,
    createdAt,
    updatedAt,
    version,
  }) {
    this.id = id;
    this.subject = subject;
    this.priority = priority;
    this.description = description;
    this.status = status;
    this.userId = userId;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.version = version;
  }

  async create() {
    const result = await model.create({
      subject: this.subject,
      priority: this.priority,
      description: this.description,
      status: this.status,
      userId: this.userId,
    });

    this.id = result.id;
    this.createAt = result.createAt;
    this.updatedAt = result.updatedAt;
    this.version = result.version;
  }

  async readOne() {
    const result = await model.findOne({ where: { id: this.id } });

    if (!result) {
      throw new Error('Não encontrado');
    } else {
      this.subject = result.subject;
      this.priority = result.priority;
      this.description = result.description;
      this.status = result.status;
      this.userId = result.userId;
      this.createAt = result.createAt;
      this.updatedAt = result.updatedAt;
      this.version = result.version;
    }
  }

  async update() {
    await model.findOne({ where: { id: this.id } });

    const fields = ['subject', 'priority', 'description', 'status', 'userId'];
    const data = {};

    fields.forEach((field) => {
      const value = this[field];

      if (typeof value === 'string' && value.length > 0) {
        data[field] = value;
      }
    });

    await model.update(data, { where: { id: this.id } });
  }

  async delete() {
    model.destroy({ where: { id: this.id } });
  }
}

module.exports = Ticket;
