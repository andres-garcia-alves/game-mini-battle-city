// tslint:disable-next-line: no-reference
/// <reference path="../../types/phaser.d.ts" />

import { FortressAnimations } from "../animations/fortress-animations";
import { Player01Animations } from "../animations/player01-animations";
import { Player02Animations } from "../animations/player02-animations";
import { RegularEnemyAnimations } from "../animations/regular-enemy-animations";
import { ScriptManager } from "../scripting/script-manager";

export class StageScene extends Phaser.Scene {

  // private const SPEED_NORMAL: number = 2;
  // private const SPEED_FAST: number = 4;

  private cursors: Phaser.Types.Input.Keyboard.CursorKeys;

  private background: Phaser.GameObjects.Image;
  private enemiesCount: Phaser.GameObjects.Group;
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

    if (this.stageNumber === undefined) { this.stageNumber = 1; }
    this.stageName = this.buildStageName(this.stageNumber);

    this.gameOver = false;
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  public preload(): void {
    this.load.image("game-background", "assets/images/backgrounds/game-background.png");

    this.load.tilemapTiledJSON(`game-stage${this.stageName}-tilemap`, `assets/stages/stage${this.stageName}-tilemap.json`);
    this.load.json(`game-stage${this.stageName}-script`, `assets/stages/stage${this.stageName}-script.json`);
    this.load.image("game-tileset", "assets/images/tiles/game-tileset.png");

    this.load.spritesheet("game-fortress", "assets/images/sprites/fortress.png", { frameWidth: 48, frameHeight: 48 });
    this.load.spritesheet("game-player-one", "assets/images/sprites/player-one.png", { frameWidth: 48, frameHeight: 48 });
    this.load.spritesheet("game-player-two", "assets/images/sprites/player-two.png", { frameWidth: 48, frameHeight: 48 });
    this.load.spritesheet("game-enemy-regular", "assets/images/sprites/enemy-regular.png", { frameWidth: 48, frameHeight: 48 });
    this.load.spritesheet("game-enemy-speedy", "assets/images/sprites/enemy-speedy.png", { frameWidth: 48, frameHeight: 48 });

    this.load.image("game-enemies-count", "assets/images/sprites/enemies-logo.png");
    this.load.image("game-level-count", "assets/images/sprites/flag-logo.png");
    this.load.image("game-lives-count", "assets/images/sprites/lives-logo.png");
  }

  public create(): void {
    this.background = this.add.image(0, 0, "game-background");
    this.background.setOrigin(0, 0);

    const map = this.make.tilemap({ key: `game-stage${this.stageName}-tilemap` });
    const tileSet = map.addTilesetImage("game-tileset", "game-tileset");
    const gameLayer = map.createStaticLayer("game-layer", tileSet, 0, 0);
    // const gameLayer = map.createDynamicLayer("game-layer", tileSet, 0, 0);
    gameLayer.setCollisionBetween(1, 9999, true, true);
    const aboveLayer = map.createStaticLayer("above-layer", tileSet, 0, 0);
    aboveLayer.setDepth(2);

    this.fortress = this.physics.add.staticSprite(360, 648, "game-fortress");
    this.fortress.setBounce(0, 0);
    this.fortress.setCollideWorldBounds(true);
    this.fortress.setImmovable(true);

    this.player1 = this.physics.add.sprite(264, 648, "game-player-one");
    this.player1.setBounce(0, 0);
    this.player1.setCollideWorldBounds(true);

    this.player2 = this.physics.add.sprite(456, 648, "game-player-two");
    this.player2.setBounce(0, 0);
    this.player2.setCollideWorldBounds(true);

    this.enemies = this.physics.add.group();

    this.levelCount = this.add.image(696, 552, "game-level-count").setOrigin(0, 0);
    this.livesCount = this.add.image(696, 432, "game-lives-count").setOrigin(0, 0);
    this.enemiesCount = this.add.group();

    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 2; j++) {
        this.enemiesCount.create(708 + (j * 24), 84 + (i * 24), "game-enemies-count");
      }
    }

    this.physics.add.collider(this.player1, this.player2);
    this.physics.add.collider(this.player1, this.fortress);
    this.physics.add.collider(this.player2, this.fortress);
    this.physics.add.collider(this.player1, gameLayer);
    this.physics.add.collider(this.player2, gameLayer);
    this.physics.add.collider(this.player1, this.enemies);
    this.physics.add.collider(this.player2, this.enemies);

    FortressAnimations.create(this);
    Player01Animations.create(this);
    Player02Animations.create(this);

    const data = this.cache.json.get(`game-stage${this.stageName}-script`);
    ScriptManager.parse(this, this.enemies, data);
  }

  public update(time): void {

    if (this.gameOver) { return; }
    if (this.player1.body === undefined) { return; }

    this.player1.setVelocity(0, 0);

    if (this.cursors.up.isDown) {
      this.player1.anims.play("game-anim-player01-up", true);
      // this.player1.setPosition(this.player1.x, this.player1.y - this.SPEED_NORMAL);
      this.player1.setVelocity(0, -160);

    } else if (this.cursors.right.isDown) {
      this.player1.anims.play("game-anim-player01-right", true);
      // this.player1.setPosition(this.player1.x + this.SPEED_NORMAL, this.player1.y);
      this.player1.setVelocity(160, 0);

    } else if (this.cursors.down.isDown) {
      this.player1.anims.play("game-anim-player01-down", true);
      // this.player1.setPosition(this.player1.x, this.player1.y + this.SPEED_NORMAL);
      this.player1.setVelocity(0, 160);

    } else if (this.cursors.left.isDown) {
      this.player1.anims.play("game-anim-player01-left", true);
      // this.player1.setPosition(this.player1.x - this.SPEED_NORMAL, this.player1.y);
      this.player1.setVelocity(-160, 0);
    }

    if (this.cursors.space.isDown && this.stageNumber < 3) {
      this.cursors.space.reset();
      this.stageCompleted();
    }

    if (this.cursors.space.isDown && this.stageNumber === 3) {
      this.cursors.space.reset();
      this.stageFailed();
    }
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
