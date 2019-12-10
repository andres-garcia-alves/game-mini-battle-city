export class PlayerTwoAnimations {

  public static create(scene: Phaser.Scene): void {

    const PLAYER02_UP: string = "game-anim-player02-up";
    const PLAYER02_RIGHT: string = "game-anim-player02-right";
    const PLAYER02_DOWN: string = "game-anim-player02-down";
    const PLAYER02_LEFT: string = "game-anim-player02-left";
    const SPRITESHEET_KEY: string = "game-player-two";

    if (scene.anims.get(PLAYER02_UP) === undefined) {
      scene.anims.create({
        frameRate: 10,
        frames: scene.anims.generateFrameNumbers(SPRITESHEET_KEY, { start: 0, end: 1 }),
        key: PLAYER02_UP,
        repeat: 1,
      });
    }

    if (scene.anims.get(PLAYER02_RIGHT) === undefined) {
      scene.anims.create({
        frameRate: 10,
        frames: scene.anims.generateFrameNumbers(SPRITESHEET_KEY, { start: 2, end: 3 }),
        key: PLAYER02_RIGHT,
        repeat: 1,
      });
    }

    if (scene.anims.get(PLAYER02_DOWN) === undefined) {
      scene.anims.create({
        frameRate: 10,
        frames: scene.anims.generateFrameNumbers(SPRITESHEET_KEY, { start: 4, end: 5 }),
        key: PLAYER02_DOWN,
        repeat: 1,
      });
    }

    if (scene.anims.get(PLAYER02_LEFT) === undefined) {
      scene.anims.create({
        frameRate: 10,
        frames: scene.anims.generateFrameNumbers(SPRITESHEET_KEY, { start: 6, end: 7 }),
        key: PLAYER02_LEFT,
        repeat: 1,
      });
    }
  }
}
