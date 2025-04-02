let canvas = document.querySelector("canvas");
canvas.setAttribute("height", 500);

let ctx = canvas.getContext("2d");

let ambulance = {
    image: new Image(),
    position: 0.2,
    prevPosition: 0.2,
    height: 0.2
}

ambulance.image.src = "images/ambulance.png";

let person = {
    image: new Image(),
    position: 0.75,
    height: 0.15
}

person.image.src = "images/person.png";

let initialRadius = 0.2;
let circles = [1.0, 0.95, 0.9, 0.85, 0.8, 0.75, 0.7, 0.65, 0.6, 0.55, 0.5, 0.45, 0.40, 0.35, 0.30, 0.25];

setInterval(() => {
    drawLoop();
}, 1000.0 / 60.0);

let velocity = 0;

function drawLoop() {
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawObject(person);
    drawObject(ambulance);

    if (circles[0] >= 1.0) {
        circles.shift();
        circles.push(initialRadius);
    }

    velocity += 2.0 * (ambulance.prevPosition - ambulance.position);
    velocity *= 0.95;

    circles.forEach((radius, index) => {
        drawCircle(radius * canvas.height, velocity * radius);
        circles[index] += 0.0025;
    });

    ambulance.prevPosition = ambulance.position;
}

function drawObject(object) {
    let drawHeight = object.height * canvas.height;
    let drawWidth = drawHeight * object.image.width / object.image.height;

    let drawX = object.position * canvas.width - drawWidth / 2;
    let drawY = canvas.height / 2 - drawHeight / 2;

    ctx.drawImage(object.image, drawX, drawY, drawWidth, drawHeight);
}

function drawCircle(radius, offset) {
    let drawHeight = ambulance.height * canvas.height;
    let drawWidth = drawHeight * ambulance.image.width / ambulance.image.height;

    let drawX = (ambulance.position + offset) * canvas.width;
    let drawY = canvas.height / 2;

    ctx.beginPath();
    ctx.arc(drawX, drawY, radius, 0, 2 * Math.PI);
    ctx.stroke();
}
