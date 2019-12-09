export class GameAnimations {

  private scene: Phaser.Scene;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
  }

  public createFortressAnimations(): void {

    if (this.scene.anims.get("game-anim-fortress-destroyed") === undefined) {
      this.scene.anims.create({
        frameRate: 10,
        frames: this.scene.anims.generateFrameNumbers("game-fortress", { start: 0, end: 1 }),
        key: "game-anim-fortress-destroyed",
        repeat: 1,
      });
    }
  }

  public createPlayer1Animations(): void {

    if (this.scene.anims.get("game-anim-player01-up") === undefined) {
      this.scene.anims.create({
        frameRate: 10,
        frames: this.scene.anims.generateFrameNumbers("game-player01", { start: 0, end: 1 }),
        key: "game-anim-player01-up",
        repeat: 1,
      });
    }

    if (this.scene.anims.get("game-anim-player01-right") === undefined) {
      this.scene.anims.create({
        frameRate: 10,
        frames: this.scene.anims.generateFrameNumbers("game-player01", { start: 2, end: 3 }),
        key: "game-anim-player01-right",
        repeat: 1,
      });
    }

    if (this.scene.anims.get("game-anim-player01-down") === undefined) {
        this.scene.anims.create({
        frameRate: 10,
        frames: this.scene.anims.generateFrameNumbers("game-player01", { start: 4, end: 5 }),
        key: "game-anim-player01-down",
        repeat: 1,
      });
    }

    if (this.scene.anims.get("game-anim-player01-left") === undefined) {
      this.scene.anims.create({
        frameRate: 10,
        frames: this.scene.anims.generateFrameNumbers("game-player01", { start: 6, end: 7 }),
        key: "game-anim-player01-left",
        repeat: 1,
      });
    }
  }

  public createPlayer2Animations(): void {

    if (this.scene.anims.get("game-anim-player01-up") === undefined) {
      this.scene.anims.create({
        frameRate: 10,
        frames: this.scene.anims.generateFrameNumbers("game-player02", { start: 0, end: 1 }),
        key: "game-anim-player02-up",
        repeat: 1,
      });
    }

    if (this.scene.anims.get("game-anim-player01-right") === undefined) {
      this.scene.anims.create({
        frameRate: 10,
        frames: this.scene.anims.generateFrameNumbers("game-player02", { start: 2, end: 3 }),
        key: "game-anim-player02-right",
        repeat: 1,
      });
    }

    if (this.scene.anims.get("game-anim-player01-down") === undefined) {
      this.scene.anims.create({
        frameRate: 10,
        frames: this.scene.anims.generateFrameNumbers("game-player02", { start: 4, end: 5 }),
        key: "game-anim-player02-down",
        repeat: 1,
      });
    }

    if (this.scene.anims.get("game-anim-player01-left") === undefined) {
      this.scene.anims.create({
        frameRate: 10,
        frames: this.scene.anims.generateFrameNumbers("game-player02", { start: 6, end: 7 }),
        key: "game-anim-player02-left",
        repeat: 1,
      });
    }
  }
}
