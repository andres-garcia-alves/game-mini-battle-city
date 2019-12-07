// tslint:disable-next-line: no-reference
/// <reference path="../../types/phaser.d.ts" />
// import "phaser";

export class StageScene extends Phaser.Scene {

  private SPEED_NORMAL: number = 2;
  private SPEED_FAST: number = 4;

  private background: Phaser.GameObjects.Image;
  private base: Phaser.Physics.Arcade.Image;
  private cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  private gameOver: boolean;
  private player1: Phaser.Physics.Arcade.Sprite;
  private player2: Phaser.Physics.Arcade.Sprite;
  private stageName: string;
  private stageNumber: number;

  constructor() {
    super ({ key: "StageScene" });
  }

  public init(params): void {
    const keyName = "stageNumber";
    this.stageNumber = params[keyName];
    this.stageName = this.buildStageName(params[keyName]);
    this.gameOver = false;
  }

  public preload(): void {
    this.load.tilemapTiledJSON(`game-${this.stageName}`, `assets/stages/stage${this.stageName}-tilemap.json`);

    this.load.image("game-background", "assets/images/backgrounds/game-background.png");
    this.load.image("game-tileset", "assets/images/tiles/game-tileset.png");
    this.load.image("game-base", "assets/images/sprites/base.png");
    this.load.spritesheet("game-player01", "assets/images/sprites/player01.png", { frameWidth: 48, frameHeight: 48 });
    this.load.spritesheet("game-player02", "assets/images/sprites/player02.png", { frameWidth: 48, frameHeight: 48 });
  }

  public create(): void {
    this.cursors = this.input.keyboard.createCursorKeys();

    this.background = this.add.image(0, 0, "game-background").setOrigin(0, 0);

    const map = this.make.tilemap({ key: `game-${this.stageName}` });
    const tileset = map.addTilesetImage("game-tileset", "game-tileset");
    const layer = map.createStaticLayer("game-layer", tileset, 0, 0);

    this.base = this.physics.add.sprite(336, 624, "game-base");
    this.base.setOrigin(0, 0);

    this.player1 = this.physics.add.sprite(240, 624, "game-player01");
    this.player1.setOrigin(0, 0);
    this.player1.setCollideWorldBounds(true);

    this.player2 = this.physics.add.sprite(432, 624, "game-player02");
    this.player2.setOrigin(0, 0);
    this.player2.setCollideWorldBounds(true);

    this.anims.create({
      frameRate: 10,
      frames: this.anims.generateFrameNumbers("game-player02", { start: 0, end: 1 }),
      key: "game-anim-up",
      repeat: 1,
    });

    this.anims.create({
      frameRate: 10,
      frames: this.anims.generateFrameNumbers("game-player02", { start: 2, end: 3 }),
      key: "game-anim-right",
      repeat: 1,
    });

    this.anims.create({
      frameRate: 10,
      frames: this.anims.generateFrameNumbers("game-player02", { start: 4, end: 5 }),
      key: "game-anim-down",
      repeat: 1,
    });

    this.anims.create({
      frameRate: 10,
      frames: this.anims.generateFrameNumbers("game-player02", { start: 6, end: 7 }),
      key: "game-anim-left",
      repeat: 1,
    });

    // const aboveLayer = map.createStaticLayer("Collision Layer", tileset, 0, 0); // por layer name del TileMap
    // const worldLayer = map.createStaticLayer("Top Layer", tileset, 0, 0);
    // const belowLayer = map.createStaticLayer("Bottom Layer", tileset, 0, 0);
    // layer = map.createLayer('Tile Layer 1');

    // aboveLayer.setCollisionByProperty({ collides: true });
    // worldLayer.setDepth(10);
    // const spawnPoint = map.findObject("Objects", obj => obj.name === "Spawn Point");
  }

  public update(time): void {

    if (this.gameOver) { return; }

    if (this.cursors.up.isDown) {
      this.player1.anims.play("game-anim-up", true);
      this.player1.setPosition(this.player1.x, this.player1.y - this.SPEED_NORMAL);
      // this.player1.setVelocityY(-160);

    } else if (this.cursors.right.isDown) {
      this.player1.anims.play("game-anim-right", true);
      this.player1.setPosition(this.player1.x + this.SPEED_NORMAL, this.player1.y);
      // this.player1.setVelocityX(160);

    } else if (this.cursors.down.isDown) {
      this.player1.anims.play("game-anim-down", true);
      this.player1.setPosition(this.player1.x, this.player1.y + this.SPEED_NORMAL);
      // this.player1.setVelocityY(160);

    } else if (this.cursors.left.isDown) {
      this.player1.anims.play("game-anim-left", true);
      this.player1.setPosition(this.player1.x - this.SPEED_NORMAL, this.player1.y);
      // this.player1.setVelocityX(-160);
    }

    if (this.cursors.space.isDown) {
      this.cursors.space.reset();
      // this.stageFailed();
      this.stageCompleted();
    }

    // if (this.cursors.up.isDown && this.player1.body.touching.down) {
    //   this.player1.setVelocityY(-330);
    // }
  }

  private buildStageName(stageNumber: number): string {
    return (stageNumber < 10) ? "0" + stageNumber.toString() : stageNumber.toString();
  }

  private stageCompleted() {
    this.scene.start("ScoresScene", { stageNumber: this.stageNumber });
  }

  private stageFailed() {
    this.scene.start("GameOverScene");
  }
}
