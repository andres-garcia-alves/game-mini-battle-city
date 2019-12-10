export class FortressAnimations {

  public static create(scene: Phaser.Scene): void {

    const FORTRESS_DESTROYED: string = "game-anim-fortress-destroyed";
    const SPRITESHEET_KEY: string = "game-fortress";

    if (scene.anims.get(FORTRESS_DESTROYED) === undefined) {
      scene.anims.create({
        frameRate: 10,
        frames: scene.anims.generateFrameNumbers(SPRITESHEET_KEY, { start: 0, end: 1 }),
        key: FORTRESS_DESTROYED,
        repeat: 1,
      });
    }
  }
}
