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
  peopleCalc() {
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

const area_zones = [
  {
    length: 10,
    width: 10,
    height: 10,
    internal: {
      quantity: 2,
      lighting: 1,
      people: 67.41,
      plug: 1
    },
    external: {
      u_factor: 0.3,
      outTemp: 90,
      inTemp: 70
    }
  },
  {
    length: 10,
    width: 10,
    height: 10,
    internal: {
      quantity: 2,
      lighting: 1,
      people: 67.41,
      plug: 1
    },
    external: {
      u_factor: 0.3,
      outTemp: 90,
      inTemp: 70
    }
  },
  {
    length: 10,
    width: 10,
    height: 10,
    internal: {
      quantity: 2,
      lighting: 1,
      people: 67.41,
      plug: 1
    },
    external: {
      u_factor: 0.3,
      outTemp: 90,
      inTemp: 70
    }
  },
  {
    length: 10,
    width: 10,
    height: 10,
    internal: {
      quantity: 2,
      lighting: 1,
      people: 67.41,
      plug: 1
    },
    external: {
      u_factor: 0.3,
      outTemp: 90,
      inTemp: 70
    }
  }
];

area_zones.forEach((area, index) => {
  //===================================
  //Init Building, Internal, & External
  //==================================
  //building_766 instance

  const building_766 = new Zone(area.length, area.width, area.height);

  const base_area = building_766.areaCalc(); //calc area
  const wall_area = building_766.areaWallCalc(); //calc wall area

  //internal load instance
  const internal_load = new InternalLoad(
    area.internal.lighting,
    area.internal.people,
    area.internal.plug,
    area.internal.quantity
  );
  const q_lighting = internal_load.lightingCalc(base_area);
  const q_people = internal_load.peopleCalc();
  const q_plug = internal_load.plugCalc(base_area);

  //external load instance
  const external_load = new ExternalLoad(
    area.external.u_factor,
    area.external.outTemp,
    area.external.inTemp
  );
  const q_conductance = external_load.conductanceQ(wall_area);

  //calculate q total
  const q_total = q_lighting + q_people + q_plug + q_conductance;

  //===================================
  //Print Results
  //===================================
  console.log(`
=========================
Area Zone ${index + 1} HVAC Report
=========================
  Floor Area: ${base_area}
  Wall Area: ${wall_area}
  Q Lighting: ${q_lighting}
  Q People: ${q_people}
  Q Plug: ${q_plug}
  Q Conductance: ${q_conductance}
  Q Total: ${q_total}
`);
});
