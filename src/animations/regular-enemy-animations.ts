// tslint:disable-next-line: no-reference
/// <reference path="../../types/phaser.d.ts" />

export class RegularEnemyAnimations {

  public static create(scene: Phaser.Scene): void {

    const REGULAR_ENEMY_UP: string = "game-anim-regular-enemy-up";
    const REGULAR_ENEMY_RIGHT: string = "game-anim-regular-enemy-right";
    const REGULAR_ENEMY_DOWN: string = "game-anim-regular-enemy-down";
    const REGULAR_ENEMY_LEFT: string = "game-anim-regular-enemy-left";
    const SPRITESHEET_KEY: string = "game-regular-enemy";

    if (scene.anims.get(REGULAR_ENEMY_UP) === undefined) {
      scene.anims.create({
        frameRate: 10,
        frames: scene.anims.generateFrameNumbers(SPRITESHEET_KEY, { start: 0, end: 1 }),
        key: REGULAR_ENEMY_UP,
        repeat: 1,
      });
    }

    if (scene.anims.get(REGULAR_ENEMY_RIGHT) === undefined) {
      scene.anims.create({
        frameRate: 10,
        frames: scene.anims.generateFrameNumbers(SPRITESHEET_KEY, { start: 2, end: 3 }),
        key: REGULAR_ENEMY_RIGHT,
        repeat: 1,
      });
    }

    if (scene.anims.get(REGULAR_ENEMY_DOWN) === undefined) {
        scene.anims.create({
        frameRate: 10,
        frames: scene.anims.generateFrameNumbers(SPRITESHEET_KEY, { start: 4, end: 5 }),
        key: REGULAR_ENEMY_DOWN,
        repeat: 1,
      });
    }

    if (scene.anims.get(REGULAR_ENEMY_LEFT) === undefined) {
      scene.anims.create({
        frameRate: 10,
        frames: scene.anims.generateFrameNumbers(SPRITESHEET_KEY, { start: 6, end: 7 }),
        key: REGULAR_ENEMY_LEFT,
        repeat: 1,
      });
    }
  }
}
