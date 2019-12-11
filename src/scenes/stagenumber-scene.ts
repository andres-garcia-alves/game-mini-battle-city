// tslint:disable-next-line: no-reference
/// <reference path="../../types/phaser.d.ts" />

export class StageNumberScene extends Phaser.Scene {

  private background: Phaser.GameObjects.Image;
  private textStageNumber: Phaser.GameObjects.BitmapText;

  private stageNumber: number;

  constructor() {
    super ({ key: "StageNumberScene" });
  }

  public init(params): void {
    const keyName = "stageNumber";
    this.stageNumber = params[keyName];
  }

  public preload(): void {
    this.load.image("load-background", "assets/images/backgrounds/load-background.png");
  }

  public create(): void {
    this.background = this.add.image(0, 0, "load-background").setOrigin(0, 0);

    this.textStageNumber = this.add.bitmapText(290 , 340, "console-font", "STAGE  " + this.stageNumber, 24);
    this.textStageNumber.setTint(0x111111);

    this.cameras.main.setScroll(0, -720);
    this.cameras.main.pan(384, 360, 500, "Linear", false);

    this.time.delayedCall(2000, () => {
      this.scene.start("StageScene", { stageNumber: this.stageNumber });
    });
  }

  public update(time): void {
    // .
  }
}
