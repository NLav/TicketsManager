const model = require('./model');

class User {
  constructor({
    id,
    email,
    name,
    password,
    company,
    admin,
    tempPassword,
    tempPasswordTime,
    createdAt,
    updatedAt,
    version,
  }) {
    this.id = id;
    this.email = email;
    this.name = name;
    this.password = password;
    this.company = company;
    this.admin = admin;
    this.tempPassword = tempPassword;
    this.tempPasswordTime = tempPasswordTime;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.version = version;
  }

  async create() {
    const result = await model.create({
      email: this.email,
      name: this.name,
      password: this.password,
      company: this.company,
      admin: this.admin,
      tempPassword: this.tempPassword,
      tempPasswordTime: this.tempPasswordTime,
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
      this.email = result.email;
      this.name = result.name;
      this.password = result.password;
      this.company = result.company;
      this.admin = result.admin;
      this.tempPassword = result.tempPassword;
      this.tempPasswordTime = result.tempPasswordTime;
      this.createAt = result.createAt;
      this.updatedAt = result.updatedAt;
      this.version = result.version;
    }
  }

  async update() {
    await model.findOne({ where: { id: this.id } });

    const fields = [
      'email',
      'name',
      'password',
      'company',
      'admin',
      'tempPassword',
      'tempPasswordTime',
    ];
    const data = {};

    fields.forEach((field) => {
      const value = this[field];

      data[field] = value;
    });

    await model.update(data, { where: { id: this.id } });
  }

  async delete() {
    model.destroy({ where: { id: this.id } });
  }
}

module.exports = User;
