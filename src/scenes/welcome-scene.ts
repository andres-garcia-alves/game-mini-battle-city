export class WelcomeScene extends Phaser.Scene {

  private bgFlag: boolean = true;
  private background: Phaser.GameObjects.Image;
  private cursors: Phaser.Types.Input.Keyboard.CursorKeys;

  constructor() {
    super ({ key: "WelcomeScene" });
  }

  public init(params): void {
    // .
  }

  public preload() {
    this.load.image("background1", "assets/images/welcome-background-01.png");
    this.load.image("background2", "assets/images/welcome-background-02.png");
  }

  public create() {
    this.background = this.add.image(0, 0, "background1").setOrigin(0, 0);
    this.cursors = this.input.keyboard.createCursorKeys();

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
    const keyName: string = (this.bgFlag) ? "background1" : "background2";
    this.background = this.add.image(0, 0, keyName).setOrigin(0, 0);

    this.bgFlag = !this.bgFlag;
  }
}
