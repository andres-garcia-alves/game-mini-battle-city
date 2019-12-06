// tslint:disable-next-line: no-reference
/// <reference path="../../types/phaser.d.ts" />
// import "phaser";

export class LoadScene extends Phaser.Scene {

  private stageNumber: number;
  private background: Phaser.GameObjects.Image;

  constructor() {
    super ({ key: "LoadScene" });
  }

  public init(params): void {
    const keyName = "stageNumber";
    this.stageNumber = params[keyName];
  }

  public preload(): void {
    this.load.image("Untitled", "assets/images/load-background.png");
  }

  public create(): void {

    this.background = this.add.image(0, 0, "Untitled").setOrigin(0, 0);

    this.time.addEvent({
      callback: this.onEvent,
      callbackScope: this,
      delay: 2000,
      loop: true,
    });

  }

  public update(time): void {
    // .
  }

  private onEvent() {
    const keyName: string = "Stage0" + this.stageNumber + "Scene";
    console.log(keyName);
    this.scene.start(keyName);
  }
}
