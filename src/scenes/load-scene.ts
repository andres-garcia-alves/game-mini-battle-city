// tslint:disable-next-line: no-reference
/// <reference path="../../types/phaser.d.ts" />
// import "phaser";

export class LoadScene extends Phaser.Scene {

  private background: Phaser.GameObjects.Image;
  // private cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  private info: Phaser.GameObjects.Text;
  private stageNumber: number;

  constructor() {
    super ({ key: "LoadScene" });
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
    // this.cursors = this.input.keyboard.createCursorKeys();
    this.info = this.add.text(330, 340, "STAGE  " + this.stageNumber, { font: "24px Courier New", fill: "#000000" });

    this.cameras.main.setScroll(0, -720);
    this.cameras.main.pan(384, 360, 500, "Linear", false);

    this.time.delayedCall(2000, () => {
      // this.stageCompleted();
      this.scene.start("StageScene", { stageNumber: this.stageNumber });
    });
  }

  public update(time): void {
    /*if (this.cursors.space.isDown) {
      this.cursors.space.reset();
      this.stageCompleted();
    }*/
  }

  private stageCompleted() {
    this.scene.start("StageScene", { stageNumber: this.stageNumber });
  }
}
