import { GameProgress } from "../entities/game-progress";

export class WelcomeScene extends Phaser.Scene {

  private background: Phaser.GameObjects.Image;
  private cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  private textStart: Phaser.GameObjects.BitmapText;

  private bgSwitch: boolean;
  private stageNumber: number;

  private gameProgress: GameProgress;

  constructor() {
    super ({ key: "WelcomeScene" });
    this.gameProgress = new GameProgress();
  }

  public init(params: GameProgress): void {
    this.bgSwitch = false;
    this.gameProgress.resetGameProgress();
  }

  public preload() {
    this.load.image("welcome-background", "assets/images/backgrounds/welcome-background.png");
    this.load.bitmapFont("console-font", "assets/fonts/press-start-2p.png", "assets/fonts/press-start-2p.fnt");
  }

  public create() {
    this.background = this.add.image(0, 0, "welcome-background").setOrigin(0, 0);
    this.cursors = this.input.keyboard.createCursorKeys();

    this.textStart = this.add.bitmapText(172, 432, "console-font", "PLEASE INSERT COIN", 24);
    this.textStart.setTint(0xEEEEEE);

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
      this.gameProgress.nextStage();
      this.scene.start("StageNumberScene", this.gameProgress);
    }
  }

  private blinkBackground() {
    this.textStart.setVisible(this.bgSwitch);
    this.bgSwitch = !this.bgSwitch;
  }
}
