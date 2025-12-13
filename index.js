const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");

const CANWAS_WIDTH = (canvas.width = 600);
const CANVAS_HEIGHT = (canvas.height = 600);

const playImage = new Image();
playImage.src = "./shadow_dog.png";

let playerState = "run";

// 一只狗的宽高
const spriteWidth = 575;
const spriteHeight = 523;

// 控制游戏帧数
let gameFrame = 0;
// 交错帧
const staggerFrames = 5;

// 存储狗的行为坐标等信息
const spriteAnimations = [];
// 狗的状态
const animationStates = [
  {
    // 行为
    name: "idle",
    // 有几帧
    frames: 7,
  },
  {
    name: "jump",
    frames: 6,
  },
  {
    name: "fail",
    frames: 6,
  },
  {
    name: "run",
    frames: 8,
  },
  {
    name: "dizzy",
    frames: 11,
  },
  {
    name: "sit",
    frames: 5,
  },
  {
    name: "roll",
    frames: 7,
  },
  {
    name: "bite",
    frames: 7,
  },
  {
    name: "ko",
    frames: 12,
  },
  {
    name: "getHit",
    frames: 4,
  },
];
animationStates.forEach((state, index) => {
  let j = 0;
  let frames = {
    loc: [],
  };
  while (j < state.frames) {
    let positionX = j * spriteWidth;
    let positionY = index * spriteHeight;
    frames.loc.push({ x: positionX, y: positionY });

    j++;
  }
  spriteAnimations[state.name] = frames;
});

const animate = () => {
  ctx.clearRect(0, 0, CANWAS_WIDTH, CANVAS_HEIGHT);

  let position =
    Math.floor(gameFrame / staggerFrames) %
    spriteAnimations[playerState].loc.length;

  let frameX = spriteWidth * position;
  let frameY = spriteAnimations[playerState].loc[position].y;

  ctx.drawImage(
    playImage,
    frameX,
    frameY,
    spriteWidth,
    spriteHeight,
    0,
    0,
    CANWAS_WIDTH,
    CANVAS_HEIGHT
  );

  gameFrame++;

  requestAnimationFrame(animate);
};
animate();
