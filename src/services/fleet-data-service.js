import { Car } from "../classes/car.js";
import { Drone } from "../classes/drone.js";
import { DataError } from "./data-errors.js";

export class FleetDataService {
  constructor() {
    this.cars = [];
    this.drones = [];
    this.errors = [];
  }

  getCarByLicense(license) {
    return this.cars.find((car) => car.license == license);
  }
  sortCarsByMake() {
    return this.cars.sort((car1, car2) => {
      if (car1.make <= car2) return -1;
      if (car1.make >= car2) return 1;
      return 0;
    });
  }

  filterCarByMake(make) {
    return this.cars.filter((car) => car.make.indexOf(make) >= 0);
  }

  loadData(fleet) {
    for (let data of fleet) {
      switch (data.type) {
        case "car":
          if (this.validateCar(data)) {
            const car = this.loadCar(data);
            if (car) {
              this.cars.push(car);
            }
          }

          break;
        case "drone":
          const drone = this.loadDrone(data);
          this.drones.push(drone);
          break;

        default:
          const error = new DataError("Not Vehicle Type", data);
          this.errors.push(error);
          break;
      }
    }
  }

  loadCar(car) {
    try {
      const carInstance = new Car(car.license, car.model, car.latLong);
      carInstance.miles = car.miles;
      carInstance.make = car.make;
      return carInstance;
    } catch (error) {
      const err = new DataError("error append car", car);
      this.errors.push(err);
    }
    return null;
  }

  validateCar(car) {
    const requiredProps = "license,model,latLong,miles,make".split(",");
    let hasErrors = false;
    for (let field of requiredProps) {
      if (!car[field]) {
        const err = new DataError(`Required ${field} for Car`, car);
        this.errors.push(err);
        hasErrors = true;
      }
    }
    return !hasErrors;
  }

  loadDrone(drone) {
    try {
      const droneInstance = new Drone(
        drone.license,
        drone.model,
        drone.latLong
      );
      droneInstance.miles = drone.miles;
      droneInstance.make = drone.make;
      return droneInstance;
    } catch (error) {
      const err = new DataError("error append drone", drone);
      this.errors.push(err);
    }
    return null;
  }
}
