// Start here
import { CanvasView }  from "./view/CanvasView";
import { Ball } from "./view/sprites/Ball";
import { Paddle } from "./view/sprites/Paddle";
import { Brick } from "./view/sprites/Brick";
import { Collision } from "./Collison";
// images
import PADDLE_IMAGE from "./images/paddle.png";
import BALL_IMAGE from "./images/ball.png";

// level and colors
import {
  PADDLE_SPEED,
  PADDLE_WIDTH,
  PADDLE_HEIGHT,
  PADDLE_STARTX,
  BALL_SPEED,
  BALL_SIZE,
  BALL_STARTX,
  BALL_STARTY
} from "./setup";

let gameOver = false;
let score = 0;

function setGameOver(view: CanvasView) {
  view.drawInfo("Game Over!");
  gameOver: false;
}

function setGameWin(view: CanvasView) {
  view.drawInfo("Game won!");
  gameOver = false;
}

// Helpers
import { createBricks } from "../src/view/helper";

function gameLoop(
  view: CanvasView,
  bricks: Brick[],
  paddle: Paddle,
  ball: Ball,
  collision: Collision
) {
  view.clear();
  view.drawBricks(bricks);
  view.drawSprite(paddle);
  view.drawSprite(ball);
  ball.moveBall();
  console.log('game loop');

  // move paddle and check so it wont move outside the playfield
  if((paddle.isMovingLeft && paddle.pos.x > 0) 
  || (paddle.isMovingRight && paddle.pos.x < view.canvas.width - paddle.width)) {
    paddle.movePaddle();
  }

  collision.checkBallCollision(ball, paddle, view);
  const collidingBrick = collision.isCollidingBricks(ball, bricks);

  if(collidingBrick) {
    score += 1;
    view.drawScore(score);
  }

  // Game over when ball leaves playfield
  if(ball.pos.y > view.canvas.height) {
    gameOver = true;
  }
  //if game won, set gameover and display win
  if(bricks.length === 0) {
    return setGameWin(view);
  }
  // return if gameover and don't run the requestAnimationFrame
  if(gameOver) {
    return setGameOver(view);
  }

  requestAnimationFrame(() => gameLoop(view, bricks, paddle, ball, collision));
}

function startGame(view: CanvasView) {
  // reset display
  score = 0;
  view.drawInfo("");
  view.drawScore(0);
  
  const collision = new Collision();

  const bricks = createBricks();

  const ball = new Ball(
    BALL_SPEED,
    BALL_SIZE,
    {x : BALL_STARTX, y: BALL_STARTY},
    BALL_IMAGE
  );

  const paddle = new Paddle(
  PADDLE_SPEED, 
  PADDLE_WIDTH, 
  PADDLE_HEIGHT, {
    x: PADDLE_STARTX,
    y: view.canvas.height - PADDLE_HEIGHT - 5
  }, PADDLE_IMAGE);

  gameLoop(view, bricks, paddle, ball, collision);
}

// create a new view
const view = new CanvasView("#playField");
view.initStartButton(startGame);