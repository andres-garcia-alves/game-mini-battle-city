// tslint:disable-next-line: no-reference
/// <reference path="../../types/phaser.d.ts" />
// import "phaser";

export class StageScene extends Phaser.Scene {

  private SPEED_NORMAL: number = 2;
  private SPEED_FAST: number = 4;

  private cursors: Phaser.Types.Input.Keyboard.CursorKeys;

  private enemiesCount: Phaser.GameObjects.Group;
  private background: Phaser.GameObjects.Image;
  private levelCount: Phaser.GameObjects.Image;
  private livesCount: Phaser.GameObjects.Image;

  private enemies: Phaser.Physics.Arcade.Group;
  private fortress: Phaser.Physics.Arcade.Sprite;
  private player1: Phaser.Physics.Arcade.Sprite;
  private player2: Phaser.Physics.Arcade.Sprite;

  private gameOver: boolean;
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
    this.load.spritesheet("game-fortress", "assets/images/sprites/fortress.png", { frameWidth: 48, frameHeight: 48 });
    this.load.spritesheet("game-player01", "assets/images/sprites/player01.png", { frameWidth: 48, frameHeight: 48 });
    this.load.spritesheet("game-player02", "assets/images/sprites/player02.png", { frameWidth: 48, frameHeight: 48 });
    this.load.image("game-enemies-count", "assets/images/sprites/enemies-logo.png");
    this.load.image("game-level-count", "assets/images/sprites/flag-logo.png");
    this.load.image("game-lives-count", "assets/images/sprites/lives-logo.png");
  }

  public create(): void {
    this.background = this.add.image(0, 0, "game-background").setOrigin(0, 0);
    this.cursors = this.input.keyboard.createCursorKeys();

    const map = this.make.tilemap({ key: `game-${this.stageName}` });
    const tileSet = map.addTilesetImage("game-tileset", "game-tileset");
    // const gameLayer = map.createStaticLayer("game-layer", tileSet, 0, 0);
    const gameLayer = map.createDynamicLayer("game-layer", tileSet, 0, 0);
    // gameLayer.setCollisionByProperty({ collides: true });

    this.fortress = this.physics.add.staticSprite(336, 624, "game-fortress");
    this.fortress.setBounce(0, 0);
    this.fortress.setCollideWorldBounds(true);
    this.fortress.setImmovable(true);
    this.fortress.setOrigin(0, 0);
    // this.fortress.setMass(1);

    this.player1 = this.physics.add.sprite(240, 624, "game-player01");
    this.player1.setBounce(0, 0);
    this.player1.setCollideWorldBounds(true);
    // this.player1.setDrag(1000);
    // this.player1.setFriction(999999, 999999);
    this.player1.setOrigin(0, 0);
    // this.player1.setMass(1);

    this.player2 = this.physics.add.sprite(432, 624, "game-player02");
    this.player2.setBounce(0, 0);
    this.player2.setCollideWorldBounds(true);
    // this.player2.setDrag(1000);
    // this.player2.setFriction(999999, 999999);
    this.player2.setOrigin(0, 0);
    // this.player2.setMass(1);

    this.enemies = this.physics.add.group();

    this.enemiesCount = this.add.group();
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 2; j++) {
        this.enemiesCount.create(708 + (j * 24), 84 + (i * 24), "game-enemies-count");
      }
    }

    this.levelCount = this.add.image(696, 552, "game-level-count").setOrigin(0, 0);
    this.livesCount = this.add.image(696, 432, "game-lives-count").setOrigin(0, 0);

    this.physics.add.collider(this.player1, this.fortress);
    this.physics.add.collider(this.player2, this.fortress);
    this.physics.add.collider(this.player1, this.player2);
    this.physics.add.collider(this.player1, this.enemies);
    this.physics.add.collider(this.player2, this.enemies);

    this.createFortressAnimations();
    this.createPlayer1Animations();
    this.createPlayer2Animations();

    // ver OVERLAP vs COLLIDER !!!
    // this.physics.add.collider(this.player1, this.player2);
    // this.physics.add.overlap(this.player1, this.player2);
    // this.physics.add.overlap(this.player1, this.enemies, collectStar, null, this);
    // this.physics.add.collider(this.player2, this.enemies, hitBomb, null, this);

    // const aboveLayer = map.createStaticLayer("Collision Layer", tileset, 0, 0);
    // const belowLayer = map.createStaticLayer("Bottom Layer", tileset, 0, 0);
    // const worldLayer = map.createStaticLayer("Top Layer", tileset, 0, 0);
    // worldLayer.setDepth(10);
    // const spawnPoint = map.findObject("Objects", obj => obj.name === "Spawn Point");
  }

  public update(time): void {

    if (this.gameOver) { return; }

    if (this.cursors.up.isDown/* && this.player1.body.blocked.up === false*/) {
      this.player1.anims.play("game-anim-player01-up", true);
      // this.player1.setPosition(this.player1.x, this.player1.y - this.SPEED_NORMAL);
      this.player1.setVelocity(0, -160);

    } else if (this.cursors.right.isDown/* && this.player1.body.blocked.right === false*/) {
      this.player1.anims.play("game-anim-player01-right", true);
      // this.player1.setPosition(this.player1.x + this.SPEED_NORMAL, this.player1.y);
      this.player1.setVelocity(160, 0);

    } else if (this.cursors.down.isDown/* && this.player1.body.touching.down === false*/) {
      this.player1.anims.play("game-anim-player01-down", true);
      // this.player1.setPosition(this.player1.x, this.player1.y + this.SPEED_NORMAL);
      this.player1.setVelocity(0, 160);

    } else if (this.cursors.left.isDown/* && this.player1.body.touching.left === false*/) {
      this.player1.anims.play("game-anim-player01-left", true);
      // this.player1.setPosition(this.player1.x - this.SPEED_NORMAL, this.player1.y);
      this.player1.setVelocity(-160, 0);

    } else {
      this.player1.setVelocity(0, 0);
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
    if (stageNumber === undefined) { stageNumber = 1; }
    return (stageNumber < 10) ? "0" + stageNumber.toString() : stageNumber.toString();
  }

  private createFortressAnimations(): void {
    this.anims.create({
      frameRate: 10,
      frames: this.anims.generateFrameNumbers("game-fortress", { start: 0, end: 1 }),
      key: "game-anim-fortress-destroyed",
      repeat: 1,
    });
  }

  private createPlayer1Animations(): void {
    this.anims.create({
      frameRate: 10,
      frames: this.anims.generateFrameNumbers("game-player01", { start: 0, end: 1 }),
      key: "game-anim-player01-up",
      repeat: 1,
    });

    this.anims.create({
      frameRate: 10,
      frames: this.anims.generateFrameNumbers("game-player01", { start: 2, end: 3 }),
      key: "game-anim-player01-right",
      repeat: 1,
    });

    this.anims.create({
      frameRate: 10,
      frames: this.anims.generateFrameNumbers("game-player01", { start: 4, end: 5 }),
      key: "game-anim-player01-down",
      repeat: 1,
    });

    this.anims.create({
      frameRate: 10,
      frames: this.anims.generateFrameNumbers("game-player01", { start: 6, end: 7 }),
      key: "game-anim-player01-left",
      repeat: 1,
    });
  }

  private createPlayer2Animations(): void {
    this.anims.create({
      frameRate: 10,
      frames: this.anims.generateFrameNumbers("game-player02", { start: 0, end: 1 }),
      key: "game-anim-player02-up",
      repeat: 1,
    });

    this.anims.create({
      frameRate: 10,
      frames: this.anims.generateFrameNumbers("game-player02", { start: 2, end: 3 }),
      key: "game-anim-player02-right",
      repeat: 1,
    });

    this.anims.create({
      frameRate: 10,
      frames: this.anims.generateFrameNumbers("game-player02", { start: 4, end: 5 }),
      key: "game-anim-player02-down",
      repeat: 1,
    });

    this.anims.create({
      frameRate: 10,
      frames: this.anims.generateFrameNumbers("game-player02", { start: 6, end: 7 }),
      key: "game-anim-player02-left",
      repeat: 1,
    });
  }

  private stageCompleted() {
    this.scene.start("ScoresScene", { stageNumber: this.stageNumber });
  }

  private stageFailed() {
    this.scene.start("GameOverScene");
  }
}
