const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");

CANVAS_WIDTH = canvas.width = 500;
CANVAS_HEIGHT = canvas.height = 700;

const explostion = [];

let canvasPosition = canvas.getBoundingClientRect();

class Explosion {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.spriteWidth = 200;
    this.spriteHeight = 179;

    this.width = this.spriteWidth / 2;
    this.height = this.spriteHeight / 2;

    this.image = new Image();
    this.image.src = "./shoot/boom.png";

    this.frame = -1;

    this.timer = 0;
  }

  update() {
    this.timer++;
    if (this.timer % 5 === 0) {
      this.frame++;
    }
  }

  draw() {
    ctx.drawImage(
      this.image,
      this.frame * this.spriteWidth,
      0,
      this.spriteWidth,
      this.spriteHeight,
      this.x - this.width / 2,
      this.y - this.height / 2,
      this.width,
      this.height
    );
  }
}

window.addEventListener("click", function (event) {
  const { x, y } = event;
  let postionX = x - canvasPosition.left;
  let postionY = y - canvasPosition.top;

  explostion.push(new Explosion(postionX, postionY));

  console.log(explostion);
});

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  explostion.forEach((items, index) => {
    items.update();
    items.draw();
    if (items.frame > 5) {
      explostion.splice(index, 1);
    }
  });

  requestAnimationFrame(animate);
}
animate();
