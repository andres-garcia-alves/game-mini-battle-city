// tslint:disable-next-line: no-reference
/// <reference path="../../types/phaser.d.ts" />

export class EnemiesSpeedyAnimations {

  public static create(scene: Phaser.Scene): void {

    const SPEEDY_ENEMY_UP: string = "game-anim-speedy-enemy-up";
    const SPEEDY_ENEMY_RIGHT: string = "game-anim-speedy-enemy-right";
    const SPEEDY_ENEMY_DOWN: string = "game-anim-speedy-enemy-down";
    const SPEEDY_ENEMY_LEFT: string = "game-anim-speedy-enemy-left";

    const KEY_ENEMY_SPEEDY: string = "game-enemy-speedy";

    if (scene.anims.get(SPEEDY_ENEMY_UP) === undefined) {
      scene.anims.create({
        frameRate: 10,
        frames: scene.anims.generateFrameNumbers(KEY_ENEMY_SPEEDY, { start: 0, end: 1 }),
        key: SPEEDY_ENEMY_UP,
        repeat: 0,
      });
    }

    if (scene.anims.get(SPEEDY_ENEMY_RIGHT) === undefined) {
      scene.anims.create({
        frameRate: 10,
        frames: scene.anims.generateFrameNumbers(KEY_ENEMY_SPEEDY, { start: 2, end: 3 }),
        key: SPEEDY_ENEMY_RIGHT,
        repeat: 0,
      });
    }

    if (scene.anims.get(SPEEDY_ENEMY_DOWN) === undefined) {
        scene.anims.create({
        frameRate: 10,
        frames: scene.anims.generateFrameNumbers(KEY_ENEMY_SPEEDY, { start: 4, end: 5 }),
        key: SPEEDY_ENEMY_DOWN,
        repeat: 0,
      });
    }

    if (scene.anims.get(SPEEDY_ENEMY_LEFT) === undefined) {
      scene.anims.create({
        frameRate: 10,
        frames: scene.anims.generateFrameNumbers(KEY_ENEMY_SPEEDY, { start: 6, end: 7 }),
        key: SPEEDY_ENEMY_LEFT,
        repeat: 0,
      });
    }
  }
}
