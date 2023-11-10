import Booking from "../models/Booking.js";

export default class BookingRepository {
  constructor() {
    this.model = Booking;
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
        data: "Error while getting bookings",
        status: 500,
      };
    }
  }

  async getByPassengerId(passengerId) {
    try {
      const result = await this.model.findAll({
        where: { passengerId: passengerId },
      });
      return result;
    } catch (err) {
      console.log(err);
      throw {
        data: "Error while getting bookings",
        status: 500,
      };
    }
  }

  async getByVehicleId(vehicleId) {
    try {
      const result = await this.model.findAll({ where: { id: vehicleId } });
      return result;
    } catch (err) {
      console.log(err);
      throw {
        data: "Error while getting bookings",
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
        data: "Error while creating booking",
        status: 500,
      };
    }
  }

  async update(id, data) {
    try {
      const result = await this.model.update(data, {
        where: { id: id },
      });
      return result;
    } catch (err) {
      console.log(err);
      throw {
        data: "Error while updating booking",
        status: 500,
      };
    }
  }

  async acceptBooking(id) {
    try {
      const result = await this.model.update(
        {
          status: "ACCEPTED",
        },
        { where: { id: id } }
      );
      return result;
    } catch (err) {
      console.log(err);
      throw {
        data: "Error while accepting booking",
        status: 500,
      };
    }
  }

  async rejectBooking(id) {
    try {
      const result = await this.model.update(
        {
          status: "REJECTED",
        },
        { where: { id: id } }
      );
      return result;
    } catch (err) {
      console.log(err);
      throw {
        data: "Error while rejecting booking",
        status: 500,
      };
    }
  }

  async rideInProgress(id) {
    try {
      const result = await this.model.update(
        {
          status: "IN_PROGRESS",
        },
        { where: { id: id } }
      );
      return result;
    } catch (err) {
      console.log(err);
      throw {
        data: "Error while atempting to book",
        status: 500,
      };
    }
  }

  async completedRide(id, comment, rating) {
    try {
      const result = await this.model.update(
        {
          status: "COMPLETED",
          comment: comment,
          rate: rating,
        },
        { where: { id: id } }
      );
      return result;
    } catch (err) {
      console.log(err);
      throw {
        data: "Error while completing booking",
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
        data: "Error while deleting booking",
        status: 500,
      };
    }
  }
}
