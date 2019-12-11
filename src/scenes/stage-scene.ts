// tslint:disable-next-line: no-reference
/// <reference path="../../types/phaser.d.ts" />

import { BulletAnimations } from "../animations/bullet-animations";
import { FortressAnimations } from "../animations/fortress-animations";
import { PlayerOneAnimations } from "../animations/player-one-animations";
import { PlayerTwoAnimations } from "../animations/player-two-animations";
import { RegularEnemyAnimations } from "../animations/regular-enemy-animations";
import { SpeedyEnemyAnimations } from "../animations/speedy-enemy-animations";

import { ScriptManager } from "../scripting/script-manager";
import { Utils } from "../utilities/utils";

export class StageScene extends Phaser.Scene {

  private cursors: Phaser.Types.Input.Keyboard.CursorKeys;

  private background: Phaser.GameObjects.Image;
  private logoEnemiesCount: Phaser.GameObjects.Group;
  private logoGameOver: Phaser.GameObjects.Image;
  private logoLevelCount: Phaser.GameObjects.Image;
  private textLevelCount: Phaser.GameObjects.BitmapText;
  private logoLivesCount1: Phaser.GameObjects.Image;
  private textLivesCount1A: Phaser.GameObjects.BitmapText;
  private textLivesCount1B: Phaser.GameObjects.BitmapText;
  private logoLivesCount2: Phaser.GameObjects.Image;
  private textLivesCount2A: Phaser.GameObjects.BitmapText;
  private textLivesCount2B: Phaser.GameObjects.BitmapText;

  private gameLayer: Phaser.Tilemaps.DynamicTilemapLayer;
  private bulletsEnemies: Phaser.Physics.Arcade.Group;
  private bulletsPlayer1: Phaser.Physics.Arcade.Group;
  private bulletsPlayer2: Phaser.Physics.Arcade.Group;
  private enemies: Phaser.Physics.Arcade.Group;
  private fortress: Phaser.Physics.Arcade.Sprite;
  private player1: Phaser.Physics.Arcade.Sprite;
  private player2: Phaser.Physics.Arcade.Sprite;

  private stageName: string;
  private stageNumber: number;

  private gameOver: boolean;
  private stageCompleted: boolean;

  constructor() {
    super ({ key: "StageScene" });
  }

  public init(params): void {
    const keyName = "stageNumber";
    this.stageNumber = params[keyName];

    if (this.stageNumber === undefined) { this.stageNumber = 1; }
    this.stageName = Utils.buildStageName(this.stageNumber);

    this.gameOver = false;
    this.stageCompleted = false;
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  public preload(): void {
    this.load.image("game-background", "assets/images/backgrounds/game-background.png");

    this.load.tilemapTiledJSON(`game-stage${this.stageName}-tilemap`, `assets/stages/stage${this.stageName}-tilemap.json`);
    this.load.json(`game-stage${this.stageName}-script`, `assets/stages/stage${this.stageName}-script.json`);
    this.load.image("game-tileset", "assets/images/tiles/game-tileset.png");

    this.load.spritesheet("game-bullet", "assets/images/sprites/bullet.png", { frameWidth: 12, frameHeight: 12 });
    this.load.spritesheet("game-fortress", "assets/images/sprites/fortress.png", { frameWidth: 48, frameHeight: 48 });
    this.load.spritesheet("game-player-one", "assets/images/sprites/player-one.png", { frameWidth: 48, frameHeight: 48 });
    this.load.spritesheet("game-player-two", "assets/images/sprites/player-two.png", { frameWidth: 48, frameHeight: 48 });
    this.load.spritesheet("game-regular-enemy", "assets/images/sprites/regular-enemy.png", { frameWidth: 48, frameHeight: 48 });
    this.load.spritesheet("game-speedy-enemy", "assets/images/sprites/speedy-enemy.png", { frameWidth: 48, frameHeight: 48 });

    this.load.image("game-enemies-count", "assets/images/sprites/logo-enemies.png");
    this.load.image("game-game-over", "assets/images/sprites/logo-game-over.png");
    this.load.image("game-level-count", "assets/images/sprites/logo-flag.png");
    this.load.image("game-lives-count", "assets/images/sprites/logo-lives.png");
  }

  public create(): void {
    this.background = this.add.image(0, 0, "game-background");
    this.background.setOrigin(0, 0);

    const map = this.make.tilemap({ key: `game-stage${this.stageName}-tilemap` });
    const tileSet = map.addTilesetImage("game-tileset", "game-tileset");
    // this.gameLayer = map.createStaticLayer("game-layer", tileSet, 0, 0);
    this.gameLayer = map.createDynamicLayer("game-layer", tileSet, 0, 0);
    this.gameLayer.setCollisionBetween(1, 9999, true, true);
    const aboveLayer = map.createStaticLayer("above-layer", tileSet, 0, 0);
    aboveLayer.setDepth(2);

    this.bulletsEnemies = this.physics.add.group();
    this.bulletsPlayer1 = this.physics.add.group();
    this.bulletsPlayer2 = this.physics.add.group();
    BulletAnimations.create(this);

    this.enemies = this.physics.add.group();
    RegularEnemyAnimations.create(this);
    SpeedyEnemyAnimations.create(this);

    this.fortress = this.physics.add.staticSprite(360, 648, "game-fortress");
    this.fortress.setBounce(0, 0);
    this.fortress.setCollideWorldBounds(true);
    this.fortress.setImmovable(true);
    FortressAnimations.create(this);

    this.player1 = this.physics.add.sprite(264, 648, "game-player-one");
    this.player1.setBounce(0, 0);
    this.player1.setCollideWorldBounds(true);
    this.player1.setData("direction", "up");
    this.player1.setData("lives", 2);
    this.player1.setData("name", "player-one");
    PlayerOneAnimations.create(this);

    this.player2 = this.physics.add.sprite(456, 648, "game-player-two");
    this.player2.setBounce(0, 0);
    this.player2.setCollideWorldBounds(true);
    this.player2.setData("direction", "up");
    this.player2.setData("lives", 2);
    this.player1.setData("name", "player-two");
    PlayerTwoAnimations.create(this);

    this.logoGameOver = this.add.image(360, 744, "game-game-over").setDepth(3);
    this.logoLevelCount = this.add.image(720, 576, "game-level-count");
    this.textLevelCount = this.add.bitmapText(720 , 600, "console-font", this.stageNumber.toString(), 24);
    this.textLevelCount.setTint(0x111111);
    this.logoLivesCount1 = this.add.image(708, 444, "game-lives-count");
    this.textLivesCount1A = this.add.bitmapText(696, 408, "console-font", "IP", 24);
    this.textLivesCount1A.setTint(0x111111);
    this.textLivesCount1B = this.add.bitmapText(724, 432, "console-font", this.player1.getData("lives"), 24);
    this.textLivesCount1B.setTint(0x111111);
    this.logoLivesCount2 = this.add.image(708, 516, "game-lives-count");
    this.textLivesCount2A = this.add.bitmapText(696, 480, "console-font", "#P", 24);
    this.textLivesCount2A.setTint(0x111111);
    this.textLivesCount2B = this.add.bitmapText(724, 504, "console-font", this.player2.getData("lives"), 24);
    this.textLivesCount2B.setTint(0x111111);
    this.logoEnemiesCount = this.add.group();
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 2; j++) {
        this.logoEnemiesCount.create(708 + (j * 24), 84 + (i * 24), "game-enemies-count");
      }
    }

    this.physics.add.collider(this.player1, this.player2);
    this.physics.add.collider(this.player1, this.gameLayer);
    this.physics.add.collider(this.player2, this.gameLayer);
    this.physics.add.collider(this.player1, this.fortress);
    this.physics.add.collider(this.player2, this.fortress);
    this.physics.add.collider(this.player1, this.enemies);
    this.physics.add.collider(this.player2, this.enemies);
    this.physics.add.collider(this.bulletsPlayer1, this.player2, this.collitionDestroyBullet, null, this);
    this.physics.add.collider(this.bulletsPlayer2, this.player1);
    this.physics.add.collider(this.bulletsEnemies, this.player1, this.collitionDestroyPlayer, null, this);
    this.physics.add.collider(this.bulletsEnemies, this.player2);
    this.physics.add.collider(this.bulletsPlayer1, this.gameLayer, this.collitionDestroyLayer, null, this);
    this.physics.add.collider(this.bulletsPlayer2, this.gameLayer);
    this.physics.add.collider(this.bulletsPlayer1, this.fortress, this.collitionDestroyFortress, null, this);
    this.physics.add.collider(this.bulletsPlayer2, this.fortress);
    this.physics.add.collider(this.bulletsPlayer1, this.enemies, this.collitionDestroyEnemy, null, this);
    this.physics.add.collider(this.bulletsPlayer2, this.enemies);
    this.physics.add.collider(this.bulletsPlayer1, this.bulletsEnemies);
    this.physics.add.collider(this.bulletsPlayer2, this.bulletsEnemies);

    const data = this.cache.json.get(`game-stage${this.stageName}-script`);
    ScriptManager.parse(this, this.enemies, data, this.enemyCreated, this.logoEnemiesCount);
  }

  public update(time): void {

    if (this.player1.body === undefined) { return; }
    this.player1.setVelocity(0, 0);

    if (this.cursors.up.isDown) {
      this.player1.anims.play("game-anim-player01-up", true);
      this.player1.setVelocity(0, -160);
      this.player1.setData("direction", "up");

    } else if (this.cursors.right.isDown) {
      this.player1.anims.play("game-anim-player01-right", true);
      this.player1.setVelocity(160, 0);
      this.player1.setData("direction", "right");

    } else if (this.cursors.down.isDown) {
      this.player1.anims.play("game-anim-player01-down", true);
      this.player1.setVelocity(0, 160);
      this.player1.setData("direction", "down");

    } else if (this.cursors.left.isDown) {
      this.player1.anims.play("game-anim-player01-left", true);
      this.player1.setVelocity(-160, 0);
      this.player1.setData("direction", "left");
    }

    if (this.cursors.space.isDown) {
      this.cursors.space.reset();
      this.createBulletPlayer1();
    }

    if (this.gameOver)        { this.stageFailed(); }
    if (this.stageCompleted)  { this.stageSucceeded(); }

    if (this.cursors.shift.isDown && this.stageNumber < 3) {
      this.cursors.shift.reset();
      this.stageSucceeded();
    }
    if (this.cursors.shift.isDown && this.stageNumber === 3) {
      this.cursors.space.reset();
      this.stageFailed();
    }
  }

  private enemyCreated(logoEnemiesCount: Phaser.GameObjects.Group) {
    logoEnemiesCount.remove(logoEnemiesCount.getLast(true), true, true);
  }

  private createBulletPlayer1() {

    if (this.bulletsPlayer1.getLength() > 0) { return; }

    const BULLET_SPEED = 360;
    const BULLET_DELTA = 24 - 1; // -1 for tiles coordinates
    const direction = this.player1.getData("direction");

    let anim: string = "";
    let posX: number = 0;
    let posY: number = 0;
    let velX: number = 0;
    let velY: number = 0;

    if (direction === "up") {
      anim = "game-anim-bullet-up";
      posX = this.player1.x;
      posY = this.player1.y - BULLET_DELTA;
      velX = 0;
      velY = -BULLET_SPEED;
    }
    if (direction === "right") {
      anim = "game-anim-bullet-right";
      posX = this.player1.x + BULLET_DELTA;
      posY = this.player1.y;
      velX = BULLET_SPEED;
      velY = 0;
    }
    if (direction === "down") {
      anim = "game-anim-bullet-down";
      posX = this.player1.x;
      posY = this.player1.y + BULLET_DELTA;
      velX = 0;
      velY = BULLET_SPEED;
    }
    if (direction === "left") {
      anim = "game-anim-bullet-left";
      posX = this.player1.x - BULLET_DELTA;
      posY = this.player1.y;
      velX = -BULLET_SPEED;
      velY = 0;
    }

    const bullet = this.bulletsPlayer1.create(posX, posY, "game-bullet");
    bullet.setBounce(0, 0);
    bullet.setCollideWorldBounds(true);
    bullet.setVelocity(velX, velY);
    bullet.setData("name", "bullet");
    bullet.anims.play(anim, true);
  }

  private collitionDestroyBullet(src: any, dest: any): void {
    this.bulletsPlayer1.remove(dest, true, true);
  }

  private collitionDestroyEnemy(src: any, dest: any): void {
    this.bulletsPlayer1.remove(src, true, true);
    this.enemies.remove(dest, true, true);

    if (this.logoEnemiesCount.getLength() === 0 && this.enemies.getLength() === 0) {
      this.stageCompleted = true;
    }
  }

  private collitionDestroyFortress(src: any, dest: any): void {
    this.fortress.anims.play("game-anim-fortress-destroyed");
    this.bulletsPlayer1.remove(dest, true, true);
    this.gameOver = true;
  }

  private collitionDestroyLayer(src: any, dest: any): void {

    const tileXY: Phaser.Math.Vector2 = this.gameLayer.worldToTileXY(src.x, src.y);
    const direction = this.player1.getData("direction");

    if (direction === "up") {
      this.gameLayer.removeTileAt(tileXY.x + 1, tileXY.y - 1);
      this.gameLayer.removeTileAt(tileXY.x, tileXY.y - 1);
      this.gameLayer.removeTileAt(tileXY.x - 1, tileXY.y - 1);
      this.gameLayer.removeTileAt(tileXY.x - 2, tileXY.y - 1);
    }
    if (direction === "right") {
      this.gameLayer.removeTileAt(tileXY.x + 1, tileXY.y - 2);
      this.gameLayer.removeTileAt(tileXY.x + 1, tileXY.y - 1);
      this.gameLayer.removeTileAt(tileXY.x + 1, tileXY.y);
      this.gameLayer.removeTileAt(tileXY.x + 1, tileXY.y + 1);
    }
    if (direction === "down") {
      this.gameLayer.removeTileAt(tileXY.x + 1, tileXY.y + 1);
      this.gameLayer.removeTileAt(tileXY.x, tileXY.y + 1);
      this.gameLayer.removeTileAt(tileXY.x - 1, tileXY.y + 1);
      this.gameLayer.removeTileAt(tileXY.x - 2, tileXY.y + 1);
    }
    if (direction === "left") {
      this.gameLayer.removeTileAt(tileXY.x - 1, tileXY.y - 2);
      this.gameLayer.removeTileAt(tileXY.x - 1, tileXY.y - 1);
      this.gameLayer.removeTileAt(tileXY.x - 1, tileXY.y);
      this.gameLayer.removeTileAt(tileXY.x - 1, tileXY.y + 1);
    }

    this.bulletsPlayer1.remove(src, true, true);
  }

  private collitionDestroyPlayer(): void {
    // .
  }

  private stageSucceeded() {
    this.time.delayedCall(3000, () => {
      this.scene.start("ScoresScene", { stageNumber: this.stageNumber });
    });
  }

  private stageFailed() {
    this.tweens.add({
      duration: 2000,
      ease: "Back", // "Back", "Cubic", "Linear"
      repeat: 0,
      targets: this.logoGameOver,
      y: "342",
      yoyo: false,
    });
    this.time.delayedCall(3000, () => {
      this.scene.start("GameOverScene");
    });
  }
}
