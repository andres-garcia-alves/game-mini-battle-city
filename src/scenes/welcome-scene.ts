export class WelcomeScene extends Phaser.Scene {

  private bgSwitch: boolean = true;
  private background: Phaser.GameObjects.Image;
  private cursors: Phaser.Types.Input.Keyboard.CursorKeys;

  constructor() {
    super ({ key: "WelcomeScene" });
  }

  public init(params): void {
    // .
  }

  public preload() {
    this.load.image("welcome-background-01", "assets/images/welcome-background-01.png");
    this.load.image("welcome-background-02", "assets/images/welcome-background-02.png");
  }

  public create() {
    this.background = this.add.image(0, 0, "welcome-background-01").setOrigin(0, 0);
    this.cursors = this.input.keyboard.createCursorKeys();

    this.cameras.main.setScroll(0, -720);
    this.cameras.main.pan(384, 360, 2000, "Linear", false);

    this.time.addEvent({
      callback: this.onEvent,
      callbackScope: this,
      delay: 500,
      loop: true,
    });
  }

  public update(time): void {
    if (this.cursors.space.isDown) {
      this.scene.start("LoadScene", { stageNumber: 1 });
    }
  }

  private onEvent() {
    const keyName: string = (this.bgSwitch) ? "welcome-background-01" : "welcome-background-02";
    this.background = this.add.image(0, 0, keyName).setOrigin(0, 0);
    this.bgSwitch = !this.bgSwitch;
  }
}
