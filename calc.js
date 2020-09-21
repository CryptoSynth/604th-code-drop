//Zone Class
class Zone {
  //create contructor for zone parameters
  constructor(length, width, height) {
    this.length = length;
    this.width = width;
    this.height = height;
  }

  //calculate the floor area
  areaCalc() {
    return this.length * this.width;
  }

  //calculate the wall area
  areaWallCalc() {
    return this.length * this.height + this.width * this.height;
  }
}

class InternalLoad {
  BTU_TO_WATT = 3.41; //1 watt = 3.41 BTU

  constructor(lighting, people, plug, quantity) {
    this.lighting = lighting;
    this.people = people;
    this.plug = plug;
    this.quantity = quantity;
  }

  //calculate lighting Q
  lightingCalc(area) {
    return this.lighting * area * this.BTU_TO_WATT * this.quantity; //BTU/hr
  }

  //calculate people Q
  peopleCalc(area) {
    return this.people * this.BTU_TO_WATT * this.quantity; //BTU/hr
  }

  //calculate plug Q
  plugCalc(area) {
    return this.plug * area * this.BTU_TO_WATT * this.quantity; //BTU/hr
  }
}

class ExternalLoad {
  constructor(u, outTemp, insideTemp) {
    this.u = u;
    this.outTemp = outTemp;
    this.insideTemp = insideTemp;
  }

  //calculate conductance Q
  conductanceQ(areaWall) {
    return this.u * areaWall * (this.outTemp - this.insideTemp); // BTU/hr
  }
}

//===================================
//Building 766 parameters
//===================================
const length = 125; //ft
const width = 25; //ft
const height = 11; //ft

const quantity = 2; //per item
const lighting = 1; // 1watt / sqft
const people = 67.41; // 1 Watt / sqft
const plug = 1; // 1watt / sqft

const u_factor = 0.3;
const outTemp = 90; // F degrees
const inTemp = 70; //F degrees

//===================================
//Init Building, Internal, & External
//===================================
//building_766 instance
const building_766 = new Zone(length, width, height);
const area = building_766.areaCalc(); //calc area
const areaWall = building_766.areaWallCalc(); //calc wall area

//internal load instance
const internal_load = new InternalLoad(lighting, people, plug, quantity);
const q_lighting = internal_load.lightingCalc(area);
const q_people = internal_load.peopleCalc(area);
const q_plug = internal_load.plugCalc(area);

//external load instance
const external_load = new ExternalLoad(u_factor, outTemp, inTemp);
const q_conductance = external_load.conductanceQ(areaWall);

//calculate q total
const q_total = q_lighting + q_people + q_plug + q_conductance;

//===================================
//Print Results
//===================================
console.log(`
=========================
Building 766 HVAC Report
=========================
  Floor Area: ${area}
  Wall Area: ${areaWall}
  Q Lighting: ${q_lighting}
  Q People: ${q_people}
  Q Plug: ${q_plug}
  Q Conductance: ${q_conductance}
  Q Total: ${q_total}
`);
