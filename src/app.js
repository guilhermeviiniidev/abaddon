class Drone {
  constructor(id) {
    this._id = id;
  }

  static maxSpeed = 2000;

  static getId(drone) {
    return drone.id;
  }

  get id() {
    return this._id + " TEMPORÁRIO";
  }

  set id(id) {
    this._id = id;
  }
}

const drone = new Drone("A123");
console.log(Drone.getId(drone));
