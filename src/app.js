import { Car } from "./classes/car.js";
import { Drone } from "./classes/drone.js";
import { FleetDataService } from "./services/fleet-data-service.js";
import { fleet } from "../fleet-data.js";

const fleetDataService = new FleetDataService();

fleetDataService.loadData(fleet);
const car = fleetDataService.getCarByLicense("AT2020");
console.log(fleetDataService.filterCarByMake('e'))
for (let error of fleetDataService.errors) console.log(error, error.message);
