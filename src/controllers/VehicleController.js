import VehicleService from "../services/VehicleService.js";

export default class VehicleController {
  constructor() {
    this.vehicleService = new VehicleService();
  }

  async getAll(queryParams) {
    try {
      const { page = 1, limit = 100 } = queryParams;
      if (limit > 500) {
        return {
          message: "Limit must be lower than 500",
          status: 400,
        };
      }
      const result = await this.vehicleService.getAll(
        Number(page),
        Number(limit)
      );

      return {
        data: result,
        status: 200,
      };
    } catch (err) {
      console.log(err);
      return {
        data: err.data,
        status: err.status,
      };
    }
  }

  async getById(query) {
    try {
      const result = await this.vehicleService.getById(query.id);
      if (result.status === 404) {
        return result;
      }
      return {
        data: result,
        status: 200,
      };
    } catch (err) {
      console.log(err);
      return {
        data: err.data,
        status: err.status,
      };
    }
  }

  async getNearest(body) {
    try {
      const result = await this.vehicleService.getNearest(body);
      return {
        data: result,
        status: 201,
      };
    } catch (err) {
      console.log(err);
      return {
        data: "Error while finding nearest vehicles",
        status: 500,
      };
    }
  }

  async create(req, res) {
    try {
      const result = await this.vehicleService.create(req.body);
      return {
        data: result,
        status: 201,
      };
    } catch (err) {
      console.log(err);
      return {
        data: err.data,
        status: err.status,
      };
    }
  }

  async update(id, data) {
    try {
      const result = await this.vehicleService.update(Number(id), data);
      return {
        data: result,
        status: 200,
      };
    } catch (err) {
      console.log(err);
      return {
        data: err.data,
        status: err.status,
      };
    }
  }

  async updateLocation(params, body) {
    try {
      const result = await this.vehicleService.updateLocation(
        params.id,
        body.lat,
        body.log
      );
      return {
        data: "Succesfully updated location",
        status: 200,
      };
    } catch (err) {
      console.log(err);
      return {
        data: err.data || "Error while updating vehicle location",
        status: err.status || 500,
      };
    }
  }

  async delete(params) {
    try {
      const result = await this.vehicleService.delete(params.id);
      return {
        data: result,
        status: 200,
      };
    } catch (err) {
      console.log(err);
      return {
        data: err.data,
        status: err.status,
      };
    }
  }
}
