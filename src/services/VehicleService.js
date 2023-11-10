// Implementiraj poslovnu logiku za vozače
import VehicleRepository from "../repositories/VehicleRepository.js";

export default class VehicleService {
  constructor() {
    this.vehicleRepository = new VehicleRepository();
  }

  async getAll(page, limit) {
    try {
      const result = await this.vehicleRepository.getAll(page, limit);
      if (!result.length) {
        throw {
          data: { message: "Passengers not found" },
          status: 404,
        };
      }
      return result;
    } catch (err) {
      console.log(err);
      throw {
        data: err.data || "Something went wrong while getting vehicles",
        status: err.status || 500,
      };
    }
  }

  async getById(id) {
    try {
      const result = await this.vehicleRepository.getById(id);
      if (!result) {
        throw {
          data: { message: "Passenger not found" },
          status: 404,
        };
      }
      return result;
    } catch (err) {
      console.log(err);
      throw {
        data: err.data || "Something went wrong while getting vehicles by id",
        status: err.status || 500,
      };
    }
  }
  async getNearest(body) {
    try {
      const result = await this.vehicleRepository.getNearest(
        body.lat,
        body.log
      );
      if (!result) {
        throw {
          data: { message: "Vehicles not found" },
          status: 404,
        };
      }
      return result;
    } catch (err) {
      console.log(err);
      throw {
        data: err.data || "Something went wrong while getting nearest vehicles",
        status: err.status || 500,
      };
    }
  }

  async create(body) {
    try {
      const result = await this.vehicleRepository.create(body);
      return result;
    } catch (err) {
      console.log(err);
      throw {
        data: "Something went wrong while creating vehicles",
        status: 500,
      };
    }
  }

  async update(id, data) {
    try {
      await this.getById(id);
      const result = await this.vehicleRepository.update(id, data);
      if (!result.length) {
        throw {
          message: "Vehicle not updated",
          status: 500,
        };
      }
      return { message: "Successfully updated vehicle" };
    } catch (err) {
      throw {
        data: err.data || "Something went wrong while updating vehicle",
        status: err.status || 500,
      };
    }
  }
  async updateAvailability(id, available) {
    try {
      const vehicle = await this.getById(id);
      const result = await this.vehicleRepository.updateAvailability(id, {
        available: available,
      });
      if (!result.length) {
        throw {
          message: "Vehicle availability not updated",
          status: 500,
        };
      }
      return { message: "Successfully updated vehicle availability" };
    } catch (err) {
      throw {
        data:
          err.data ||
          "Something went wrong while updating vehicle availability",
        status: err.status || 500,
      };
    }
  }

  async updateLocation(id, lat, log) {
    try {
      await this.getById(id);
      const result = await this.vehicleRepository.updateLocation(id, lat, log);
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
      await this.getById(id);
      await this.passengerRepository.delete(id, data);
      return { message: "Successfully deleted vehicle" };
    } catch (err) {
      throw {
        data: err.data || "Something went wrong while deleting vehicle",
        status: err.status || 500,
      };
    }
  }
}
