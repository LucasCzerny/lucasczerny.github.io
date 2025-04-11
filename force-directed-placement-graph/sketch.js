let width, height;

let nrNodesSelect;
let nrGroupsSelect;

let groups;

const colors = ["#e6194b", "#3cb44b", "#ffe119", "#4363d8", "#f58231", "#911eb4", "#46f0f0", "#f032e6"];
const attractForce = 0.5;

function setup() {
  width = window.innerWidth;
  height = window.innerHeight;

  createCanvas(width, height);

  nrNodesSelect = createSelect();
  nrNodesSelect.option(10);
  nrNodesSelect.option(100);
  nrNodesSelect.option(500);
  nrNodesSelect.option(1000);
  nrNodesSelect.option(5000);
  nrNodesSelect.option(10000);

  nrNodesSelect.selected(100);
  nrNodesSelect.position(10, 10);
  nrNodesSelect.changed(createGroups);

  nrGroupsSelect = createSelect();
  nrGroupsSelect.option(2);
  nrGroupsSelect.option(4);
  nrGroupsSelect.option(8);
  // nrGroupsSelect.option(16);
  // nrGroupsSelect.option(32);
  // nrGroupsSelect.option(64);
  // nrGroupsSelect.option(128);

  nrGroupsSelect.selected(4);
  nrGroupsSelect.position(10, 40);
  nrGroupsSelect.changed(createGroups);

  createGroups();
}

function resizeWindow() {
  width = window.innerWidth;
  height = window.innerHeight;

  resizeCanvas(width, height);

  loop();
}

function draw() {
  background("#202020");

  // TODO: use fucking p5 vector
  for (let group of groups) {
    for (let position1 of group) {
      for (let position2 of group) {
        const distance = 
      }
    }
  }

  for (let [index, group] of groups.entries()) {
    fill(colors[index]);
    for (let position of group) {
      circle(position[0], position[1], 10);
    }
  }
}

function createGroups() {
  const nrNodes = nrNodesSelect.selected();
  const nrGroups = nrGroupsSelect.selected();
  
  groups = Array.from({ length: nrGroups }, () => []);

  for (let i = 0; i < nrNodes; i++) {
    const groupIndex = Math.floor(Math.random() * nrGroups);
    const randomPosition = [
      Math.floor(Math.random() * width),
      Math.floor(Math.random() * height),
    ];
    
    groups[groupIndex].push(randomPosition);
  }
}
