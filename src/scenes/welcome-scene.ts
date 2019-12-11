export class WelcomeScene extends Phaser.Scene {

  private background: Phaser.GameObjects.Image;
  private cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  private startText: Phaser.GameObjects.BitmapText;

  private bgSwitch: boolean;
  private stageNumber: number;

  constructor() {
    super ({ key: "WelcomeScene" });
  }

  public init(params): void {
    this.bgSwitch = false;
    this.stageNumber = 0;
  }

  public preload() {
    this.load.image("welcome-background", "assets/images/backgrounds/welcome-background.png");
    this.load.bitmapFont("console-font", "assets/fonts/press-start-2p.png", "assets/fonts/press-start-2p.fnt");
  }

  public create() {
    this.background = this.add.image(0, 0, "welcome-background").setOrigin(0, 0);
    this.cursors = this.input.keyboard.createCursorKeys();

    this.startText = this.add.bitmapText(172, 432, "console-font", "PLEASE INSERT COIN", 24);
    this.startText.setDepth(1);
    this.startText.setTint(0xEEEEEE);

    this.cameras.main.setScroll(0, -720);
    this.cameras.main.pan(384, 360, 2000, "Linear", false);

    this.time.addEvent({
      callback: this.blinkBackground,
      callbackScope: this,
      delay: 500,
      loop: true,
    });
  }

  public update(time): void {
    if (this.cursors.space.isDown) {
      this.cursors.space.reset();
      this.scene.start("StageNumberScene", { stageNumber: this.stageNumber + 1 });
    }
  }

  private blinkBackground() {
    /*const keyName: string = (this.bgSwitch) ? "welcome-background-01" : "welcome-background-02";
    this.background = this.add.image(0, 0, keyName).setOrigin(0, 0);*/

    this.startText.setVisible(this.bgSwitch);
    this.bgSwitch = !this.bgSwitch;
  }
}
