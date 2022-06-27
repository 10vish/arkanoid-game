import { CanvasView  } from "./view/CanvasView";
import { Brick } from "./view/sprites/Brick";
import { Paddle } from "./view/sprite/Paddle";
import { Ball } from "./view/sprite/Ball";

export class Collision {
  isCollidingBrick(ball: Ball, brick: Brick): boolean {
    if(ball.pos.x < brick.pos.x + brick.width &&
      ball.pos.x + ball.width > brick.pos.x &&
      ball.pos.y < brick.pos.y + brick.height &&
      ball.pos.y + ball.height > brick.pos.y) {
        return true;
      }
      else {
        return false;
      }
  }
  // check ball collision with bricks
  isCollidingBricks(ball: Ball, bricks: Brick[]): boolean {
    let colliding = false;

    bricks.forEach((brick, i) => {
      if(this.isCollidingBrick(ball, brick)) {
        ball.changeYDirection();
        if(brick.energy === 1) {
          bricks.splice(i, 1);
        }
        else {
          brick.energy--;
        }
        colliding = true;
      }
    });

    return colliding;
  }

  checkBallCollision(ball: Ball, paddle: Paddle, view: CanvasView): void {

    // check ball collision with paddle
    if(ball.pos.x + ball.width > paddle.pos.x 
      && ball.pos.x < paddle.pos.x + paddle.width
      && ball.pos.y + ball.height === paddle.pos.y) {
        ball.changeYDirection();
    }

    if(ball.pos.x > view.canvas.width - ball.width || ball.pos.x < 0) {
      ball.changeXDirection();
    }
    //ball movement Y contraints
    if(ball.pos.y < 0) {
      ball.changeYDirection();
    }
  }
}