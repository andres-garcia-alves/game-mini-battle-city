// tslint:disable-next-line: no-reference
/// <reference path="../../types/phaser.d.ts" />
// import "phaser";

export class StageScene extends Phaser.Scene {

  private background: Phaser.GameObjects.Image;
  private stageNumber: number;

  constructor() {
    super ({ key: "StageScene" });
  }

  public init(params): void {
    const keyName = "stageNumber";
    this.stageNumber = params[keyName];
  }

  public preload(): void {
    this.load.image("game-background", "assets/images/backgrounds/game-background.png");
    this.load.image("tileMap", "assets/images/tiles/TileMap.png");
    this.load.image("tileSet", "assets/images/tiles/TileSet.png");

    // this.load.tilemapCSV("stage01", "assets/stages/stage01-map.csv");
    // this.load.tilemapImpact()
    this.load.tilemapTiledJSON("stage01", "assets/stages/stage01-map.json");


  }

  public create(): void {
    this.background = this.add.image(0, 0, "game-background").setOrigin(0, 0);

    const map = this.make.tilemap({ key: "stage01" });
    const tileset = map.addTilesetImage("tileSet", "tiles");
    // const tileset = map.addTilesetImage('tmw_desert_spacing');

    // const layer = map.createStaticLayer(0, tiles, 0, 0); // por layer index del TileMap
    // const aboveLayer = map.createStaticLayer("Collision Layer", tileset, 0, 0); // por layer name del TileMap
    // const worldLayer = map.createStaticLayer("Top Layer", tileset, 0, 0);
    // const belowLayer = map.createStaticLayer("Bottom Layer", tileset, 0, 0);
    // layer = map.createLayer('Tile Layer 1');

    // aboveLayer.setCollisionByProperty({ collides: true });
    // worldLayer.setDepth(10);
    // const spawnPoint = map.findObject("Objects", obj => obj.name === "Spawn Point");
  }

  public update(time): void {
    // .
  }

  private stageCompleted() {
    this.scene.start("LoadScene", { stageNumber: this.stageNumber + 1 });
  }
}
