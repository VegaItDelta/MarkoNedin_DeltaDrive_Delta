import PassengerService from "../services/PassengerService.js";
import BookingService from "../services/BookingService.js";

export default class PassengerController {
  constructor() {
    this.passengerService = new PassengerService();
    this.bookingService = new BookingService();
  }

  async getAll(queryParams) {
    try {
      const { page = 1, limit = 100 } = queryParams;
      if (limit > 500) {
        return {
          data: "Limit must be lower than 500",
          status: 400,
        };
      }
      const result = await this.passengerService.getAll(
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
      const result = await this.passengerService.getById(query.id);
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

  async getHistory(params) {
    try {
      const bookings = await this.bookingService.getByPassengerId(
        params.passengerId
      );
      if (!bookings.length) {
        return {
          data: "Bookings not found for passenger",
          status: 404,
        };
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

  async create(body) {
    try {
      const result = await this.passengerService.create(body);
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

  async login(body) {
    try {
      const result = await this.passengerService.login(
        body.email,
        body.password
      );
      return {
        data: { token: result },
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

  async update(params, body) {
    try {
      const { email, firstName, lastName, birthDay, password } = body;
      const result = await this.passengerService.update(Number(params.id), {
        email,
        firstName,
        lastName,
        birthDay,
        password,
      });
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

  async delete(params) {
    try {
      const result = await this.passengerService.delete(Number(params.id));
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
