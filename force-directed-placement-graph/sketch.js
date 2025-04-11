let width, height;

let nrNodesSelect;
let nrGroupsSelect;

let groups;

const colors = ["#e6194b", "#3cb44b", "#ffe119", "#4363d8", "#f58231", "#911eb4", "#46f0f0", "#f032e6"];
const attractForce = 0.005;
const repulseForce = 1000.0;
const minNodeDistance = 50;

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

  for (let group of groups) {
    for (let node of group) {
      const nodePosition = nodes[node];
      let force = createVector(0, 0);
    
      for (let other of group) {
        if (node == other) {
          continue;
        }
      
        const otherPosition = nodes[other];

        let direction = p5.Vector.sub(otherPosition, nodePosition);
        const distance = direction.mag();
        direction.normalize();

        force.add(direction.mult(attractForce * (distance - minNodeDistance)));
      }

      // repulsion to all other nodes
      for (let [other, otherPosition] of nodes.entries()) {
        if (node == other) {
          continue;
        }
      
        let direction = p5.Vector.sub(otherPosition, nodePosition);
        const distance = direction.mag();
        direction.normalize();

        // dampen repulsion
        if (distance < 500) {
          force.add(direction.mult(-repulseForce / (distance * distance)));
        }
      }

      nodes[node].add(force);
    }
  }

  for (let [index, group] of groups.entries()) {
    fill(colors[index]);
    for (let node of group) {
      const nodePosition = nodes[node];
      circle(nodePosition.x, nodePosition.y, 10);
    }
  }
}

function createGroups() {
  const nrNodes = nrNodesSelect.selected();
  const nrGroups = nrGroupsSelect.selected();
  
  nodes = [];
  groups = Array.from({ length: nrGroups }, () => []);

  for (let i = 0; i < nrNodes; i++) {
    const groupIndex = Math.floor(Math.random() * nrGroups);
    const randomPosition = createVector(
      Math.floor(Math.random() * width),
      Math.floor(Math.random() * height),
    );
    
    nodes.push(randomPosition);
    groups[groupIndex].push(i);
  }
}
