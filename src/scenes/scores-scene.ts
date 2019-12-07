// tslint:disable-next-line: no-reference
/// <reference path="../../types/phaser.d.ts" />

export class ScoresScene extends Phaser.Scene {

  private background: Phaser.GameObjects.Image;
  private info: Phaser.GameObjects.Text;
  private stageNumber: number;

  constructor() {
    super ({ key: "ScoresScene" });
  }

  public init(params): void {
    const keyName = "stageNumber";
    this.stageNumber = params[keyName];
  }

  public preload(): void {
    this.load.image("scores-background", "assets/images/backgrounds/scores-background.png");
  }

  public create(): void {
    this.background = this.add.image(0, 0, "scores-background").setOrigin(0, 0);

    this.time.delayedCall(2000, () => {
      this.scene.start("LoadScene", { stageNumber: this.stageNumber + 1 });
    });
  }

  public update(time): void {
    // .
  }
}
