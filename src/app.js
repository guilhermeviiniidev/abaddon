import { Car } from "./classes/car.js";
import { Drone } from "./classes/drone.js";
import { FleetDataService } from "./services/fleet-data-service.js";
import { fleet } from "../fleet-data.js";
import { Button } from "./ui/button.js";
import $ from "jquery";
import { Image } from "./ui/image.js";
import { TitleBar } from "./ui/title-bar.js";
import { DataTable } from "./ui/data-table.js";

const links = [
  { title: "HOME", href: "" },
  { title: "CAR", href: "" },
  { title: "DRONE", href: "" },
  { title: "MAP", href: "" },
];

// const button = new Button("Clique aqui");
// button.appendToElement($("body"));

// const image = new Image(
//   "https://mappa.ag/wp-content/uploads/2021/07/quadcopter-voando-na-natureza_231208-10459.jpg"
// );
// image.appendToElement($("body"));

const titleBar = new TitleBar("Minha aplicação");
for (let link of links) {
  titleBar.addLinks(link.title, link.href);
}
// titleBar.appendToElement($("body"));

const headers = "License Model Miles Make".split(" ");
const dataService = new FleetDataService();
dataService.loadData(fleet);

const dataTable = new DataTable(headers, dataService.cars);
dataTable.appendToElement($("body"));
