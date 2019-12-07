export class WelcomeScene extends Phaser.Scene {

  private bgSwitch: boolean = true;
  private background: Phaser.GameObjects.Image;
  private cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  private stageNumber: number;

  constructor() {
    super ({ key: "WelcomeScene" });
  }

  public init(params): void {
    this.stageNumber = 0;
  }

  public preload() {
    this.load.image("welcome-background-01", "assets/images/backgrounds/welcome-background-01.png");
    this.load.image("welcome-background-02", "assets/images/backgrounds/welcome-background-02.png");
  }

  public create() {
    this.background = this.add.image(0, 0, "welcome-background-01").setOrigin(0, 0);
    this.cursors = this.input.keyboard.createCursorKeys();

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
      this.scene.start("LoadScene", { stageNumber: this.stageNumber + 1 });
    }
  }

  private blinkBackground() {
    const keyName: string = (this.bgSwitch) ? "welcome-background-01" : "welcome-background-02";
    this.background = this.add.image(0, 0, keyName).setOrigin(0, 0);
    this.bgSwitch = !this.bgSwitch;
  }
}
