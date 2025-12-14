const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");

const CANVAS_WIDTH = (canvas.width = 800);
const CANVAS_HEIGHT = (canvas.height = 800);

const numberOfEnemies = 10;
const enmitesArray = [];

const enemyImage = new Image();
enemyImage.src = "./enemy/enemy4.png";

let gameFrame = 0;

class Enemy {
  constructor() {
    this.speed = Math.random() * 4 + 1;

    this.spriteWidth = 213;
    this.spriteHeight = 213;

    this.width = this.spriteWidth / 2.5;
    this.height = this.spriteHeight / 2.5;

    this.x = Math.random() * (canvas.width - this.width);
    this.y = Math.random() * (canvas.height - this.height);

    this.newX = Math.random() * (canvas.width - this.width);
    this.newY = Math.random() * (canvas.height - this.height);

    this.frame = 0;
    this.flapSpeed = Math.floor(Math.random() * 3 + 1);

    this.interval = Math.floor(Math.random() * 200 + 50);
  }

  update() {
    // this.x = 100 * Math.sin(this.angle * (Math.PI / 180));
    // this.y += this.curve * Math.sin(this.angle);
    if (gameFrame % this.interval === 0) {
      this.newX = Math.random() * (canvas.width - this.width);
      this.newY = Math.random() * (canvas.height - this.height);
    }
    let dx = this.x - this.newX;
    let dy = this.y - this.newY;

    this.x -= dx / 50;
    this.y -= dy / 30;

    if (this.x + this.width < 0) this.x = canvas.width;

    // 帧
    if (gameFrame % this.flapSpeed === 0) {
      this.frame > 7 ? (this.frame = 0) : this.frame++;
    }
  }

  draw() {
    ctx.strokeRect(this.x, this.y, this.width, this.height);
    ctx.drawImage(
      enemyImage,
      this.frame * this.spriteWidth,
      0,
      this.spriteWidth,
      this.spriteHeight,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
}

for (let i = 0; i < numberOfEnemies; i++) {
  enmitesArray.push(new Enemy());
}
console.log(enmitesArray);

function animate() {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  enmitesArray.forEach((items) => {
    items.update();
    items.draw();
  });

  gameFrame++;

  requestAnimationFrame(animate);
}
animate();
