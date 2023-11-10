import Vehicle from "../models/Vehicle.js";

export default class VehicleRepository {
  constructor() {
    this.model = Vehicle;
  }

  async getAll(page, limit) {
    try {
      const ofset = page * limit;
      const result = await this.model.findAll({ ofset, limit });
      return result;
    } catch (err) {
      console.log(err);
      throw {
        data: "Error while getting vehicles",
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
        data: "Error while getting vehicles",
        status: 500,
      };
    }
  }

  async getNearest(lat, log) {
    try {
      //LAT & LOG IN SPECIFIC RANGE
      const result = await this.model.findAll({
        where: { latitude: lat, longitude: log },
        // where: { latitude: [lat], longitude: [log] },
      });
      return result;
    } catch (err) {
      console.log(err);
      throw {
        data: "Error while getting vehicles by latitude and lonfitude",
        status: 500,
      };
    }
  }

  async create(id) {
    try {
      const result = await this.model.create(id);
      return result;
    } catch (err) {
      console.log(err);
      throw {
        data: "Error while creating vehicles",
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
        data: "Error while updating vehicles.",
        status: 500,
      };
    }
  }
  async updateAvailability(id, available) {
    try {
      const result = await this.model.update(id, {
        where: { available: available },
      });
      return result;
    } catch (err) {
      console.log(err);
      throw {
        data: "Error while updating available vehicles",
        status: 500,
      };
    }
  }
  async updateLocation(id, lat, log) {
    try {
      const result = await this.model.update(
        { latitude: lat, logitude: log },
        { where: { id: id } }
      );
      return result;
    } catch (err) {
      console.log(err);
      throw {
        data: "Error while updating vehicle location",
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
        data: "Error while deleting vehicles.",
        status: 500,
      };
    }
  }
}
