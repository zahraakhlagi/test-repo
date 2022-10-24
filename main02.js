let canvas = document.getElementById('canvas');
let context = canvas.getContext('2d');

const width = canvas.width;
const height = canvas.height;
const halfWidth = width / 2;
const halfHeight = height / 2;

class Position {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

class Velocity {
    constructor(dx, dy) {
        this.dx = dx;
        this.dy = dy;
    }
}

class Keys {
    constructor() {
        this.up = false;
        this.down = false;
        this.left = false;
        this.right = false;
    }
}

class Player {
    constructor() {
        this.position = new Position(halfWidth, halfHeight);
        this.speed = 300;
        this.radius = 30;
        this.color = 'green';
        this.keys = new Keys();
        this.lives = 3;
    }
}

class Enemy {
    constructor(position, velocity) {
        this.position = position;
        this.velocity = velocity;
        this.radius = 10;
        this.color = 'red';
    }
}

let player = new Player();
let enemies = [];

function handleKeyDown(event) {
    if (event.repeat) return;

    if (event.key === 'w') {
        player.keys.up = true;

    } else if (event.key === 'a') {
        player.keys.left = true;

    } else if (event.key === 's') {
        player.keys.down = true;

    } else if (event.key === 'd') {
        player.keys.right = true;
    }
}

function handleKeyUp(event) {
    if (event.key === 'w') {
        player.keys.up = false;

    } else if (event.key === 'a') {
        player.keys.left = false;

    } else if (event.key === 's') {
        player.keys.down = false;
        
    } else if (event.key === 'd') {
        player.keys.right = false;
    }
}

window.addEventListener('keypress', handleKeyDown);
window.addEventListener('keyup', handleKeyUp);

function drawCircle(entity) {
    context.beginPath();
    context.fillStyle = entity.color;
    context.arc(entity.position.x, entity.position.y, entity.radius, 0, Math.PI * 2);
    context.fill();
}

function drawPlayerLives(player) {
    context.font = '48px serif';
    context.fillStyle = 'black';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText(player.lives, player.position.x, player.position.y);
}

function handlePlayerMovement(player, deltaTime) {
    if (player.keys.up && player.position.y > player.radius) {
        player.position.y -= player.speed * deltaTime;
    }

    if (player.keys.down && player.position.y < height - player.radius) {
        player.position.y += player.speed * deltaTime;
    }

    if (player.keys.left && player.position.x > player.radius) {
        player.position.x -= player.speed * deltaTime;
    }

    if (player.keys.right && player.position.x < width - player.radius) {
        player.position.x += player.speed * deltaTime;
    }
}

function handleEnemyMovement(enemy, deltaTime) {
    enemy.position.x += enemy.velocity.dx * deltaTime;
    enemy.position.y += enemy.velocity.dy * deltaTime;
}

function isCircleOutside(entity) {
    return (entity.position.x < -entity.radius || 
        entity.position.x > width + entity.radius || 
        entity.position.y < -entity.radius || 
        entity.position.y > height + entity.radius);
}

function generateEnemyPosition() {
    let side = generateNumberBetween(1, 4, false);

    if (side === 1) { // vänster sida
        return new Position(0, generateNumberBetween(0, height, true));
    } else if (side === 2) { // höger sida
        return new Position(width, generateNumberBetween(0, height, true));
    } else if (side === 3) { // övre sidan
        return new Position(generateNumberBetween(0, width, true), 0);
    } else { // nedre sidan
        return new Position(generateNumberBetween(0, width, true), height);
    }
}

function circleCollision(circle1, circle2) {
    let dx = circle1.position.x - circle2.position.x;
    let dy = circle1.position.y - circle2.position.y;
    let distance = Math.sqrt((dx * dx) + (dy * dy));

    return distance < circle1.radius + circle2.radius;
}

function generateRandomVelocity() {
    return new Velocity(generateNumberBetween(-200, 200, true), generateNumberBetween(-200, 200, true));
}

let tickCount = 0;
let lastTick = Date.now();

// Date.now() kommer returnera nuvarande datumet/tiden i millisekunder

function tick() {
    let currentTick = Date.now();
    let deltaTime = (currentTick - lastTick) / 1000;
    lastTick = currentTick;

    tickCount ++;

    context.fillStyle = 'rgb(255, 255, 255)';
    context.fillRect(0, 0, width, height);

    drawCircle(player);
    handlePlayerMovement(player, deltaTime);
    drawPlayerLives(player);

    for (let i = 0; i < enemies.length; i++) {
        let enemy = enemies[i];

        drawCircle(enemy);
        handleEnemyMovement(enemy, deltaTime);

        if (isCircleOutside(enemy)) {
            enemies.splice(i, 1);
            continue;
        }

        if (circleCollision(enemy, player)) {
            enemies.splice(i, 1);
            player.lives -= 1;

            if (player.lives <= 0) {
                alert("Game Over!");
                return;
            }

            continue;
        }
    }

    if (tickCount % 30 === 0) {
        let enemy = new Enemy(generateEnemyPosition(), generateRandomVelocity());
        enemies.push(enemy);
    }

    requestAnimationFrame(tick);
}

tick();

function generateNumberBetween(min, max, fraction) {
    if (fraction) {
        return Math.random() * (max - min) + min;
    } else {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
}