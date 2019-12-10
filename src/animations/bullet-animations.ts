// tslint:disable-next-line: no-reference
/// <reference path="../../types/phaser.d.ts" />

export class BulletAnimations {

  public static create(scene: Phaser.Scene): void {

    const BULLET_UP: string = "game-anim-bullet-up";
    const BULLET_RIGHT: string = "game-anim-bullet-right";
    const BULLET_DOWN: string = "game-anim-bullet-down";
    const BULLET_LEFT: string = "game-anim-bullet-left";

    const SPRITESHEET_KEY: string = "game-bullet";

    if (scene.anims.get(BULLET_UP) === undefined) {
      scene.anims.create({
        frameRate: 10,
        frames: scene.anims.generateFrameNumbers(SPRITESHEET_KEY, { start: 0, end: 0 }),
        key: BULLET_UP,
        repeat: 1,
      });
    }

    if (scene.anims.get(BULLET_RIGHT) === undefined) {
      scene.anims.create({
        frameRate: 10,
        frames: scene.anims.generateFrameNumbers(SPRITESHEET_KEY, { start: 1, end: 1 }),
        key: BULLET_RIGHT,
        repeat: 1,
      });
    }

    if (scene.anims.get(BULLET_DOWN) === undefined) {
        scene.anims.create({
        frameRate: 10,
        frames: scene.anims.generateFrameNumbers(SPRITESHEET_KEY, { start: 2, end: 2 }),
        key: BULLET_DOWN,
        repeat: 1,
      });
    }

    if (scene.anims.get(BULLET_LEFT) === undefined) {
      scene.anims.create({
        frameRate: 10,
        frames: scene.anims.generateFrameNumbers(SPRITESHEET_KEY, { start: 3, end: 3 }),
        key: BULLET_LEFT,
        repeat: 1,
      });
    }
  }
}
