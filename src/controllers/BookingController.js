import BookingService from "../services/BookingService.js";
import PassengerService from "../services/PassengerService.js";

export default class BookingController {
  constructor() {
    this.bookingService = new BookingService();
    this.passengerService = new PassengerService();
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
      const result = await this.bookingService.getAll(
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
      const result = await this.bookingService.getById(query.id);
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

  async bookRide(data) {
    try {
      const { email, vehicleId } = data;
      const result = await this.bookingService.bookRide(email, vehicleId);
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
  async update(params, body) {
    try {
      const result = await this.bookingService.update(Number(params.id), body);
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

  async acceptRide(data) {
    try {
      const result = await this.bookingService.acceptRide(Number(data.id));
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
  async rejectRide(data) {
    try {
      const result = await this.bookingService.rejectRide(Number(data.id));
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
  async rideInProgress(data, params) {
    try {
      const result = await this.bookingService.rideInProgress(data.id);
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
  async completedRide(data, params) {
    try {
      const { comment, rate } = data;
      const result = await this.bookingService.completedRide(
        params.id,
        comment,
        rate
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

  async delete(params) {
    try {
      const result = await this.bookingService.delete(params.id);
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
