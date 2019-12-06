// tslint:disable-next-line: no-reference
/// <reference path="../../types/phaser.d.ts" />
// import "phaser";

export class LoadScene extends Phaser.Scene {

  private stageNumber: number;
  private background: Phaser.GameObjects.Image;
  private info: Phaser.GameObjects.Text;

  constructor() {
    super ({ key: "LoadScene" });
  }

  public init(params): void {
    const keyName = "stageNumber";
    this.stageNumber = params[keyName];
  }

  public preload(): void {
    this.load.image("load-background", "assets/images/load-background.png");
  }

  public create(): void {

    this.background = this.add.image(0, 0, "load-background").setOrigin(0, 0);

    this.info = this.add.text(330, 340, "STAGE  " + this.stageNumber, { font: "24px Courier New", fill: "#000000" });
    // this.cameras.main.fade(3000);
    // this.camera.resetFX();
    this.cameras.main.pan(384, 1080, 1000);

    this.time.addEvent({
      callback: this.onEvent,
      callbackScope: this,
      delay: 2000,
      loop: false,
    });
  }

  public update(time): void {
    // .
  }

  private onEvent() {
    const keyName: string = "Stage0" + this.stageNumber + "Scene";
    this.scene.start("Stage01Scene", null);
  }
}
