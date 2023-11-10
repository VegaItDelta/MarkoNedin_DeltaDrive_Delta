// Implementiraj poslovnu logiku za vožnje
import BookingRepository from "../repositories/BookingRepository.js";
import PassengerService from "./PassengerService.js";
import VehicleService from "./VehicleService.js";
import VehicleRepository from "../repositories/VehicleRepository.js";
import Booking from "../models/Booking.js";

export default class BookingService {
  constructor() {
    this.bookingRepository = new BookingRepository();
    this.passengerService = new PassengerService();
    this.vehicleService = new VehicleService();
  }

  async getAll(page, limit) {
    try {
      const result = await this.bookingRepository.getAll(page, limit);
      if (!result.length)
        throw {
          data: { message: "Booking not found" },
          status: 404,
        };
      return result;
    } catch (err) {
      console.log(err);
      throw {
        data: err.data || "Something went wrong while getting bookings",
        status: err.status || 500,
      };
    }
  }

  async getById(id) {
    try {
      const result = await this.bookingRepository.getById(id);
      if (!result) {
        throw {
          data: { message: "Booking not found" },
          status: 404,
        };
      }
      return result;
    } catch (err) {
      console.log(err);
      throw {
        data: err.data || "Something went wrong while getting booking by id",
        status: err.status || 500,
      };
    }
  }

  async getByPassengerId(passengerId) {
    try {
      const result = await this.bookingRepository.getByPassengerId(passengerId);
      if (!result) {
        throw {
          data: { message: "Booking not found" },
          status: 404,
        };
      }
      return result;
    } catch (err) {
      console.log(err);
      throw {
        data: err.data || "Something went wrong while getting booking by id",
        status: err.status || 500,
      };
    }
  }

  async getByVehicleId(vehicleId) {
    try {
      const result = await this.bookingRepository.getByVehicleId(vehicleId);
      if (!result) {
        throw {
          data: { message: "Bookings not found" },
          status: 404,
        };
      }
      return result;
    } catch (err) {
      console.log(err);
      throw {
        data: err.data || "Something went wrong while getting booking by id",
        status: err.status || 500,
      };
    }
  }

  async bookRide(email, vehicleId) {
    try {
      const passenger = await this.passengerService.getByEmail(email);
      if (!passenger) {
        throw { data: "Passenger not found", status: 404 };
      }
      const vehicle = await this.vehicleService.getById(vehicleId);
      if (!vehicle) {
        throw { data: "Vehicle not found", status: 404 };
      }
      const newBooking = {
        vehicleId: vehicleId,
        passengerId: passenger.id,
        startingPrice: vehicle.startPrice,
        pricePerKm: vehicle.pricePerKM,
        status: "PENDING",
      };
      const booking = await this.bookingRepository.create(newBooking);
      const updateResult = await this.vehicleService.updateAvailability(
        vehicleId,
        false
      );
      //SEND NOTIFICATION TO DRIVER
      return booking;
    } catch (err) {
      console.log(err);
      throw {
        data: err.data || "Something went wrong while creating booking",
        status: err.status || 500,
      };
    }
  }

  async acceptRide(bookingId) {
    try {
      await this.getById(bookingId);
      const result = await this.bookingRepository.acceptBooking(bookingId);
      if (result) {
        return {
          message: "Successfully accepted booking",
          status: 201,
        };
      } else {
        throw {
          data: err.data || "Something went wrong while accepting bookings",
          status: err.status || 500,
        };
      }
    } catch (err) {
      console.log(err);
      throw {
        data: err.data || "Unable to accept booking",
        status: err.status || 500,
      };
    }
  }

  async rejectRide(bookingId) {
    try {
      await this.getById(bookingId);
      const result = await this.bookingRepository.rejectBooking(bookingId);
      if (!result) {
        throw {
          message: "Unable to reject booking",
          status: 500,
        };
      }
      return {
        message: "Successfully reject booking",
      };
    } catch (err) {
      console.log(err);
      throw {
        data: err.data || "Unable to reject booking",
        status: err.status || 500,
      };
    }
  }

  async rideInProgress(bookingId) {
    try {
      await this.getById(bookingId);
      const result = await this.bookingRepository.rideInProgress(bookingId);
      if (!result) {
        throw {
          message: "Unable to set ride in progress",
          status: 500,
        };
      }
      return {
        message: "Successfully started the ride.",
      };
    } catch (err) {
      console.log(err);
      throw {
        data: err.data || "Unable to start the ride",
        status: err.status || 500,
      };
    }
  }
  async completedRide(bookingId, comment, rating) {
    try {
      const booking = await this.getById(bookingId);
      const newAverageRating = await this.calculateAverageRating(
        booking.vehicleId,
        rating
      );
      await this.vehicleService.update(booking.vehicleId, {
        averageRating: newAverageRating,
      });
      const result = await this.bookingRepository.completedRide(
        bookingId,
        comment,
        rating
      );
      if (result) {
        return {
          message: "Successfully completed the ride",
          status: 201,
        };
      } else {
        throw {
          message: "Unable to complete the ride",
          status: 500,
        };
      }
    } catch (err) {
      console.log(err);
      throw {
        data: err.data || "Unable to complete the ride.",
        status: err.status || 500,
      };
    }
  }

  async update(id, data) {
    try {
      await this.getById(id);
      const result = await this.bookingRepository.update(id, data);
      if (!result.length) {
        throw {
          message: "Booking not updated",
          status: 500,
        };
      }
      return { message: "Successfully updated booking" };
    } catch (err) {
      console.log(err);
      throw {
        data: err.data || "Unable to update booking.",
        status: err.status || 500,
      };
    }
  }

  async calculateAverageRating(vehicleId, newRate) {
    try {
      const allBookings = await this.getByVehicleId(vehicleId);
      let allRatings = allBookings?.map((booking) => {
        return booking.rate;
      });
      if (!allRatings.length) {
        return newRate;
      }
      allRatings = [...allRatings, newRate];
      const averageRating =
        allRatings.reduce((a, b) => a + b) / allRatings.length;
      return averageRating;
    } catch (err) {
      throw {
        data: err.data || "Error while calculating average rating.",
        status: err.status || 500,
      };
    }
  }
}
