// tslint:disable-next-line: no-reference
/// <reference path="../../types/phaser.d.ts" />

export class StageNumberScene extends Phaser.Scene {

  private background: Phaser.GameObjects.Image;
  // private cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  private info: Phaser.GameObjects.Text;
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
    this.load.bitmapFont("welcome-font", "assets/fonts/press-start-2p.png", "assets/fonts/press-start-2p.fnt");
  }

  public create(): void {
    this.background = this.add.image(0, 0, "load-background").setOrigin(0, 0);
    // this.cursors = this.input.keyboard.createCursorKeys();
    this.info = this.add.text(330, 340, "STAGE  " + this.stageNumber, { font: "24px Courier New", fill: "#000000" });
    let texto: Phaser.GameObjects.BitmapText = this.add.bitmapText(200, 500, "welcome-font", "PROBANDO");

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
