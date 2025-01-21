const Car = require("../models/car.model");
const redisService = require("./redis.service");
const logger = require("../config/logger");

class CarService {
  async getCars({ page = 1, limit = 10, search = "" }) {
    try {
      // Try to get from cache first
      const cacheKey = redisService.getCarListKey(page, limit, search);
      const cachedResult = await redisService.get(cacheKey);

      if (cachedResult) {
        return cachedResult;
      }

      // If not in cache, fetch from database
      const pageNum = parseInt(page);
      const limitNum = parseInt(limit);
      const skip = (pageNum - 1) * limitNum;

      const query = search
        ? {
            $or: [
              { Brand: { $regex: search, $options: "i" } },
              { Model: { $regex: search, $options: "i" } },
            ],
          }
        : {};

      const [cars, total] = await Promise.all([
        Car.find(query).skip(skip).limit(limitNum).lean(),
        Car.countDocuments(query),
      ]);

      const totalPages = Math.ceil(total / limitNum);
      const validatedPage = Math.min(pageNum, totalPages);

      const result = {
        cars,
        total,
        page: validatedPage,
        totalPages,
        hasNextPage: validatedPage < totalPages,
        hasPrevPage: validatedPage > 1,
      };

      // Cache the result for 5 minutes
      await redisService.set(cacheKey, result, 300);

      return result;
    } catch (error) {
      logger.error("Error in getCars:", error);
      throw error;
    }
  }

  async getCarById(id) {
    try {
      // Try to get from cache first
      const cacheKey = redisService.getCarDetailKey(id);
      const cachedCar = await redisService.get(cacheKey);

      if (cachedCar) {
        return cachedCar;
      }

      // If not in cache, fetch from database
      const car = await Car.findById(id).lean();
      if (!car) {
        throw new Error("Car not found");
      }

      // Cache the car details for 10 minutes
      await redisService.set(cacheKey, car, 600);

      return car;
    } catch (error) {
      logger.error(`Error retrieving car with ID ${id}:`, error);
      throw error;
    }
  }

  async createCar(carData) {
    try {
      const car = new Car(carData);
      await car.save();

      // Clear car list caches when a new car is added
      await redisService.clearCarCaches();

      return car;
    } catch (error) {
      logger.error("Error in createCar:", error);
      throw error;
    }
  }

  async updateCar(id, carData) {
    try {
      const car = await Car.findByIdAndUpdate(id, carData, {
        new: true,
        runValidators: true,
      });

      if (!car) {
        throw new Error("Car not found");
      }

      // Clear both specific car cache and list caches
      await redisService.clearCarCaches();

      return car;
    } catch (error) {
      logger.error("Error in updateCar:", error);
      throw error;
    }
  }

  async deleteCar(id) {
    try {
      const car = await Car.findByIdAndDelete(id);

      if (!car) {
        throw new Error("Car not found");
      }

      // Clear both specific car cache and list caches
      await redisService.clearCarCaches();

      return car;
    } catch (error) {
      logger.error("Error in deleteCar:", error);
      throw error;
    }
  }
}

module.exports = new CarService();
