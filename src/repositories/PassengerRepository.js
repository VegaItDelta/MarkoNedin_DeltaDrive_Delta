import Passenger from "../models/Passenger.js";

export default class PassengerRepository {
  constructor() {
    this.model = Passenger;
  }

  async getAll(page, limit) {
    try {
      const ofset = page * limit;
      const result = await this.model.findAll({ ofset, limit });
      return result;
    } catch (err) {
      console.log(err);
      throw {
        data: "Error while getting passengers",
        status: 500,
      };
    }
  }

  async getById(id) {
    try {
      const result = await this.model.findOne({ where: { id: id } });
      return result;
    } catch (err) {
      console.log(err);
      throw {
        data: "Error while getting passengers",
        status: 500,
      };
    }
  }

  async getByEmail(email) {
    try {
      const result = await this.model.findOne({ where: { email: email } });
      return result;
    } catch (err) {
      console.log(err);
      throw {
        data: "Error while getting passengers by email",
        status: 500,
      };
    }
  }

  async create(data) {
    try {
      const result = await this.model.create(data);
      return result;
    } catch (err) {
      console.log(err);
      throw {
        data: "Error while creating passengers",
        status: 500,
      };
    }
  }

  async update(id, data) {
    try {
      const result = await this.model.update(data, { where: { id: id } });
      return result;
    } catch (err) {
      console.log(err);
      throw {
        data: "Error while updating passengers",
        status: 500,
      };
    }
  }

  async delete(id) {
    try {
      const result = await this.model.destroy(
        { truncate: { cascade: false } },
        { where: { id: id } }
      );
      return result;
    } catch (err) {
      console.log(err);
      throw {
        data: "Error while deleting passengers",
        status: 500,
      };
    }
  }
}
