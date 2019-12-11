export class PlayerOneAnimations {

  public static create(scene: Phaser.Scene): void {

    const PLAYER01_UP: string = "game-anim-player01-up";
    const PLAYER01_RIGHT: string = "game-anim-player01-right";
    const PLAYER01_DOWN: string = "game-anim-player01-down";
    const PLAYER01_LEFT: string = "game-anim-player01-left";

    const KEY_PLAYER_ONE: string = "game-player-one";

    if (scene.anims.get(PLAYER01_UP) === undefined) {
      scene.anims.create({
        frameRate: 10,
        frames: scene.anims.generateFrameNumbers(KEY_PLAYER_ONE, { start: 0, end: 1 }),
        key: PLAYER01_UP,
        repeat: 0,
      });
    }

    if (scene.anims.get(PLAYER01_RIGHT) === undefined) {
      scene.anims.create({
        frameRate: 10,
        frames: scene.anims.generateFrameNumbers(KEY_PLAYER_ONE, { start: 2, end: 3 }),
        key: PLAYER01_RIGHT,
        repeat: 0,
      });
    }

    if (scene.anims.get(PLAYER01_DOWN) === undefined) {
        scene.anims.create({
        frameRate: 10,
        frames: scene.anims.generateFrameNumbers(KEY_PLAYER_ONE, { start: 4, end: 5 }),
        key: PLAYER01_DOWN,
        repeat: 0,
      });
    }

    if (scene.anims.get(PLAYER01_LEFT) === undefined) {
      scene.anims.create({
        frameRate: 10,
        frames: scene.anims.generateFrameNumbers(KEY_PLAYER_ONE, { start: 6, end: 7 }),
        key: PLAYER01_LEFT,
        repeat: 0,
      });
    }
  }
}
