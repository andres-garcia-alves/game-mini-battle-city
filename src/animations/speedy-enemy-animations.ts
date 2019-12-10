// tslint:disable-next-line: no-reference
/// <reference path="../../types/phaser.d.ts" />

export class SpeedyEnemyAnimations {

  public static create(scene: Phaser.Scene): void {

    const SPEEDY_ENEMY_UP: string = "game-anim-speedy-enemy-up";
    const SPEEDY_ENEMY_RIGHT: string = "game-anim-speedy-enemy-right";
    const SPEEDY_ENEMY_DOWN: string = "game-anim-speedy-enemy-down";
    const SPEEDY_ENEMY_LEFT: string = "game-anim-speedy-enemy-left";
    const SPRITESHEET_KEY: string = "game-speedy-enemy";

    if (scene.anims.get(SPEEDY_ENEMY_UP) === undefined) {
      scene.anims.create({
        frameRate: 10,
        frames: scene.anims.generateFrameNumbers(SPRITESHEET_KEY, { start: 0, end: 1 }),
        key: SPEEDY_ENEMY_UP,
        repeat: 1,
      });
    }

    if (scene.anims.get(SPEEDY_ENEMY_RIGHT) === undefined) {
      scene.anims.create({
        frameRate: 10,
        frames: scene.anims.generateFrameNumbers(SPRITESHEET_KEY, { start: 2, end: 3 }),
        key: SPEEDY_ENEMY_RIGHT,
        repeat: 1,
      });
    }

    if (scene.anims.get(SPEEDY_ENEMY_DOWN) === undefined) {
        scene.anims.create({
        frameRate: 10,
        frames: scene.anims.generateFrameNumbers(SPRITESHEET_KEY, { start: 4, end: 5 }),
        key: SPEEDY_ENEMY_DOWN,
        repeat: 1,
      });
    }

    if (scene.anims.get(SPEEDY_ENEMY_LEFT) === undefined) {
      scene.anims.create({
        frameRate: 10,
        frames: scene.anims.generateFrameNumbers(SPRITESHEET_KEY, { start: 6, end: 7 }),
        key: SPEEDY_ENEMY_LEFT,
        repeat: 1,
      });
    }
  }
}
