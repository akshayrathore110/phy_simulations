// Importing Matter.js modules
let Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies,
    Body = Matter.Body;

let engine;
let world;
let boxA, boxB, ground;

function setup() {
    // Create canvas for rendering
    createCanvas(800, 400);
    
    // Setup Matter.js physics engine
    engine = Engine.create();
    world = engine.world;

    // Create objects
    boxA = Bodies.rectangle(300, 200, 100, 50);
    boxB = Bodies.rectangle(500, 200, 50, 100);
    
    // Ground
    ground = Bodies.rectangle(400, 380, 810, 60, { isStatic: true });

    // Add all objects to the world
    World.add(world, [boxA, boxB, ground]);

    // Render the simulation
    Engine.run(engine);
}

function draw() {
    background(255);
    
    // Render the objects
    drawBody(boxA);
    drawBody(boxB);
    drawBody(ground);
    
    // Display the center of mass
    fill(255, 0, 0);
    ellipse(boxA.position.x, boxA.position.y, 10, 10);
    ellipse(boxB.position.x, boxB.position.y, 10, 10);
}

function drawBody(body) {
    const vertices = body.vertices;
    beginShape();
    for (let i = 0; i < vertices.length; i++) {
        vertex(vertices[i].x, vertices[i].y);
    }
    endShape(CLOSE);
}

// Apply torque (rotation force)
function keyPressed() {
    if (keyCode === LEFT_ARROW) {
        Body.applyForce(boxA, { x: boxA.position.x, y: boxA.position.y }, { x: -0.05, y: 0 });
    } else if (keyCode === RIGHT_ARROW) {
        Body.applyForce(boxA, { x: boxA.position.x, y: boxA.position.y }, { x: 0.05, y: 0 });
    }
}
