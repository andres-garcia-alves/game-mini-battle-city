// tslint:disable-next-line: no-reference
/// <reference path="../../types/phaser.d.ts" />
// import "phaser";

export class StageScene extends Phaser.Scene {

  private background: Phaser.GameObjects.Image;
  private stageNumber: number;

  constructor() {
    super ({ key: "StageScene" });
  }

  public init(params): void {
    const keyName = "stageNumber";
    this.stageNumber = params[keyName];
  }

  public preload(): void {
    console.log("stage:", this.stageNumber);
    this.load.image("game-background", "assets/images/game-background.png");
  }

  public create(): void {
    this.background = this.add.image(0, 0, "game-background").setOrigin(0, 0);
  }

  public update(time): void {
    // .
  }
}
