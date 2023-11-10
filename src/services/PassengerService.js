import PassengerRepository from "../repositories/PassengerRepository.js";
import bcrypt from "bcrypt";
import { generateAuthToken } from "../middlewares/auth.js";

export default class PassengerService {
  constructor() {
    this.passengerRepository = new PassengerRepository();
  }

  async getAll(page, limit) {
    try {
      const result = await this.passengerRepository.getAll(page, limit);
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
        data: err.data || "Something went wrong while getting passengers",
        status: err.status || 500,
      };
    }
  }

  async getById(id) {
    try {
      const result = await this.passengerRepository.getById(id);
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
        data: err.data || "Something went wrong while getting passenger by id",
        status: err.status || 500,
      };
    }
  }

  async getByEmail(email) {
    try {
      const result = await this.passengerRepository.getByEmail(email);
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
        data: err.data || "Something went wrong while getting user by email",
        status: err.status || 500,
      };
    }
  }

  async login(email, password) {
    try {
      const passenger = await this.passengerRepository.getByEmail(email);
      const isPasswordValid = await bcrypt.compare(
        password,
        passenger.password
      );
      if (!isPasswordValid) {
        throw {
          data: "Password not valid",
          status: 400,
        };
      }

      const token = await generateAuthToken(passenger.id);
      return token;
    } catch (err) {
      console.log(err);
      throw {
        data: err.data || "Something went wrong while logging user",
        status: err.status || 500,
      };
    }
  }

  async create(passenger) {
    try {
      const existingPassenger = await this.passengerRepository.getByEmail(
        passenger.email
      );
      if (existingPassenger) {
        throw {
          data: "User already exists",
          status: 400,
        };
      }
      passenger.password = await bcrypt.hash(passenger.password, 12);
      const result = await this.passengerRepository.create(passenger);
      return result;
    } catch (err) {
      console.log(err);
      throw {
        data: err.data || "Something went wrong while creating passenger",
        status: err.status || 500,
      };
    }
  }

  async update(id, data) {
    try {
      await this.getById(id);
      data.password = await bcrypt.hash(data.password, 12);
      const result = await this.passengerRepository.update(id, data);
      if (!result.length) {
        throw {
          message: "Passenger not updated",
          status: 500,
        };
      }
      return { message: "Successfully updated passenger" };
    } catch (err) {
      throw {
        data: err.data || "Something went wrong while updating passenger",
        status: err.status || 500,
      };
    }
  }
  async delete(id, data) {
    try {
      await this.getById(id);
      await this.passengerRepository.delete(id, data);
      return { message: "Successfully deleted passenger" };
    } catch (err) {
      throw {
        data: err.data || "Something went wrong while deliting passenger",
        status: err.status || 500,
      };
    }
  }
}
