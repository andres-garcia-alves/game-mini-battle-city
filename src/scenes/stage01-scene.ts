// tslint:disable-next-line: no-reference
/// <reference path="../../types/phaser.d.ts" />
// import "phaser";

export class Stage01Scene extends Phaser.Scene {

  private background: Phaser.GameObjects.Image;

  constructor() {
    super ({ key: "Stage01Scene" });
  }

  public init(params): void {
    // .
  }

  public preload(): void {
    this.load.image("background", "assets/images/game-background.png");
  }

  public create(): void {
    this.background = this.add.image(0, 0, "background").setOrigin(0, 0);
  }

  public update(time): void {
    // .
  }
}
