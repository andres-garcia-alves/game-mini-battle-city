// tslint:disable-next-line: no-reference
/// <reference path="../../types/phaser.d.ts" />

export class EnemiesShooterAnimations {

  public static create(scene: Phaser.Scene): void {

    const SHOOTER_ENEMY_UP: string = "game-anim-shooter-enemy-up";
    const SHOOTER_ENEMY_RIGHT: string = "game-anim-shooter-enemy-right";
    const SHOOTER_ENEMY_DOWN: string = "game-anim-shooter-enemy-down";
    const SHOOTER_ENEMY_LEFT: string = "game-anim-shooter-enemy-left";

    const KEY_ENEMY_SHOOTER: string = "game-enemy-shooter";

    if (scene.anims.get(SHOOTER_ENEMY_UP) === undefined) {
      scene.anims.create({
        frameRate: 10,
        frames: scene.anims.generateFrameNumbers(KEY_ENEMY_SHOOTER, { start: 0, end: 1 }),
        key: SHOOTER_ENEMY_UP,
        repeat: 0,
      });
    }

    if (scene.anims.get(SHOOTER_ENEMY_RIGHT) === undefined) {
      scene.anims.create({
        frameRate: 10,
        frames: scene.anims.generateFrameNumbers(KEY_ENEMY_SHOOTER, { start: 2, end: 3 }),
        key: SHOOTER_ENEMY_RIGHT,
        repeat: 0,
      });
    }

    if (scene.anims.get(SHOOTER_ENEMY_DOWN) === undefined) {
        scene.anims.create({
        frameRate: 10,
        frames: scene.anims.generateFrameNumbers(KEY_ENEMY_SHOOTER, { start: 4, end: 5 }),
        key: SHOOTER_ENEMY_DOWN,
        repeat: 0,
      });
    }

    if (scene.anims.get(SHOOTER_ENEMY_LEFT) === undefined) {
      scene.anims.create({
        frameRate: 10,
        frames: scene.anims.generateFrameNumbers(KEY_ENEMY_SHOOTER, { start: 6, end: 7 }),
        key: SHOOTER_ENEMY_LEFT,
        repeat: 0,
      });
    }
  }
}
