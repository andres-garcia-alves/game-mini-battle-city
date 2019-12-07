// tslint:disable-next-line: no-reference
/// <reference path="../../types/phaser.d.ts" />
// import "phaser";

export class StageScene extends Phaser.Scene {

  private background: Phaser.GameObjects.Image;
  private cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  private stageNumber: number;
  private stageName: string;

  constructor() {
    super ({ key: "StageScene" });
  }

  public init(params): void {
    const keyName = "stageNumber";
    this.stageNumber = params[keyName];
    this.stageName = this.buildStageName(params[keyName]);
  }

  public preload(): void {
    this.load.tilemapTiledJSON(`key-game-${this.stageName}`, `assets/stages/stage${this.stageName}-tilemap.json`);

    this.load.image("key-game-background", "assets/images/backgrounds/game-background.png");
    this.load.image("key-game-tileset", "assets/images/tiles/game-tileset.png");
    this.load.image("key-game-player01", "assets/images/sprites/player01.png");
  }

  public create(): void {
    this.background = this.add.image(0, 0, "key-game-background").setOrigin(0, 0);
    this.cursors = this.input.keyboard.createCursorKeys();

    const map = this.make.tilemap({ key: `key-game-${this.stageName}` });
    const tileset = map.addTilesetImage("game-tileset", "key-game-tileset");
    const layer = map.createStaticLayer("game-layer", tileset, 0, 0);

    // const aboveLayer = map.createStaticLayer("Collision Layer", tileset, 0, 0); // por layer name del TileMap
    // const worldLayer = map.createStaticLayer("Top Layer", tileset, 0, 0);
    // const belowLayer = map.createStaticLayer("Bottom Layer", tileset, 0, 0);
    // layer = map.createLayer('Tile Layer 1');

    // aboveLayer.setCollisionByProperty({ collides: true });
    // worldLayer.setDepth(10);
    // const spawnPoint = map.findObject("Objects", obj => obj.name === "Spawn Point");
  }

  public update(time): void {
    if (this.cursors.space.isDown) {
      this.cursors.space.reset();
      this.stageCompleted();
    }
  }

  private buildStageName(stageNumber: number): string {
    return (stageNumber < 10) ? "0" + stageNumber.toString() : stageNumber.toString();
  }

  private stageCompleted() {
    this.scene.start("ScoresScene", { stageNumber: this.stageNumber });
  }
}
