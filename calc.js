//internal load
//area of each zone
const zone = {
  length: 61,
  width: 21,
  height: 10,
  area: (a, b) => {
    return a * b;
  }
};

const quantity = 2;

//people, lighting, & plug loads
const q_people = 230; // Btu/Hr

const lighting = zone.area(zone.length, zone.width); // wa/sqft
const q_lighting = lighting * 3.41;

const plugLoad = zone.area(zone.length, zone.width); //watts/sqft
const q_load = plugLoad * 3.41;

//external load
const out_temp = 90; //degrees
const inside_temp = 55; //degrees
const u = 0.8;
const a_wall =
  zone.area(zone.height, zone.length) + zone.area(zone.height, zone.width); //sqft

const q_conductance = u * a_wall * (out_temp - inside_temp);

//total sensible load
const q_total = quantity * (q_people + q_lighting + q_load) + q_conductance;

console.log(
  `Lighting: ${2 * q_lighting} + People: ${2 * q_people} + Load: ${
    2 * q_load
  } + Conductance: ${q_conductance} = Total: ${q_total}`
);
