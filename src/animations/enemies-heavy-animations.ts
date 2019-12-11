// tslint:disable-next-line: no-reference
/// <reference path="../../types/phaser.d.ts" />

export class EnemiesHeavyAnimations {

  public static create(scene: Phaser.Scene): void {

    const HEAVY_ENEMY_UP: string = "game-anim-heavy-enemy-up";
    const HEAVY_ENEMY_RIGHT: string = "game-anim-heavy-enemy-right";
    const HEAVY_ENEMY_DOWN: string = "game-anim-heavy-enemy-down";
    const HEAVY_ENEMY_LEFT: string = "game-anim-heavy-enemy-left";

    const KEY_ENEMY_HEAVY: string = "game-enemy-heavy";

    if (scene.anims.get(HEAVY_ENEMY_UP) === undefined) {
      scene.anims.create({
        frameRate: 10,
        frames: scene.anims.generateFrameNumbers(KEY_ENEMY_HEAVY, { start: 0, end: 1 }),
        key: HEAVY_ENEMY_UP,
        repeat: 0,
      });
    }

    if (scene.anims.get(HEAVY_ENEMY_RIGHT) === undefined) {
      scene.anims.create({
        frameRate: 10,
        frames: scene.anims.generateFrameNumbers(KEY_ENEMY_HEAVY, { start: 2, end: 3 }),
        key: HEAVY_ENEMY_RIGHT,
        repeat: 0,
      });
    }

    if (scene.anims.get(HEAVY_ENEMY_DOWN) === undefined) {
        scene.anims.create({
        frameRate: 10,
        frames: scene.anims.generateFrameNumbers(KEY_ENEMY_HEAVY, { start: 4, end: 5 }),
        key: HEAVY_ENEMY_DOWN,
        repeat: 0,
      });
    }

    if (scene.anims.get(HEAVY_ENEMY_LEFT) === undefined) {
      scene.anims.create({
        frameRate: 10,
        frames: scene.anims.generateFrameNumbers(KEY_ENEMY_HEAVY, { start: 6, end: 7 }),
        key: HEAVY_ENEMY_LEFT,
        repeat: 0,
      });
    }
  }
}
