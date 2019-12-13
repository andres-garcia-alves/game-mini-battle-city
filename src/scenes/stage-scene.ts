// tslint:disable-next-line: no-reference
/// <reference path="../../types/phaser.d.ts" />

import { BulletAnimations } from "../animations/bullet-animations";
import { EnemiesHeavyAnimations } from "../animations/enemies-heavy-animations";
import { EnemiesRegularAnimations } from "../animations/enemies-regular-animations";
import { EnemiesShooterAnimations } from "../animations/enemies-shooter-animations";
import { EnemiesSpeedyAnimations } from "../animations/enemies-speedy-animations";
import { FortressAnimations } from "../animations/fortress-animations";
import { PlayerOneAnimations } from "../animations/player-one-animations";
import { PlayerTwoAnimations } from "../animations/player-two-animations";
import { SpawnPointAnimations } from "../animations/spawn-point-animations";

import { GameProgress } from "../entities/game-progress";
import { ScriptManager } from "../scripting/script-manager";
import { StateMachine } from "../scripting/state-machine";

import { EnemiesState } from "../state/enemies-state";
import { PlayerState } from "../state/player-state";

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

  private frameLayer: Phaser.Tilemaps.StaticTilemapLayer;
  private gameLayer: Phaser.Tilemaps.DynamicTilemapLayer;
  private bulletsEnemies: Phaser.Physics.Arcade.Group;
  private bulletsPlayer1: Phaser.Physics.Arcade.Group;
  private bulletsPlayer2: Phaser.Physics.Arcade.Group;
  private enemies: Phaser.Physics.Arcade.Group;
  private fortress: Phaser.Physics.Arcade.Sprite;
  private player1: Phaser.Physics.Arcade.Sprite;
  private player2: Phaser.Physics.Arcade.Sprite;

  private gameProgress: GameProgress;

  private filesBaseKey: string;
  private filesBaseUrl: string;
  private gameOver: boolean;
  private stageCompleted: boolean;
  private sceneEnding: boolean;

  constructor() {
    super ({ key: "StageScene" });
  }

  public init(params: GameProgress): void {
    this.gameProgress = params;
    this.gameProgress.resetStageStats();

    this.filesBaseKey = "game-stage" + this.gameProgress.getStageName();
    this.filesBaseUrl = "assets/stages/stage" + this.gameProgress.getStageName();

    this.gameOver = false;
    this.stageCompleted = false;
    this.sceneEnding = false;
  }

  public preload(): void {
    this.load.image("game-background", "assets/images/backgrounds/game-background.png");

    this.load.tilemapTiledJSON(this.filesBaseKey + "-tilemap", this.filesBaseUrl + "-tilemap.json");
    this.load.json(this.filesBaseKey + "-script", this.filesBaseUrl + "-script.json");
    this.load.image("game-tileset", "assets/images/tiles/game-tileset.png");

    this.load.spritesheet("game-bullet", "assets/images/sprites/bullet.png", { frameWidth: 12, frameHeight: 12 });
    this.load.spritesheet("game-bullet-explosion", "assets/images/sprites/bullet-explosion.png", { frameWidth: 48, frameHeight: 48 });
    this.load.spritesheet("game-enemy-regular", "assets/images/sprites/enemy-regular.png", { frameWidth: 48, frameHeight: 48 });
    this.load.spritesheet("game-enemy-speedy", "assets/images/sprites/enemy-speedy.png", { frameWidth: 48, frameHeight: 48 });
    this.load.spritesheet("game-enemy-shooter", "assets/images/sprites/enemy-shooter.png", { frameWidth: 48, frameHeight: 48 });
    this.load.spritesheet("game-enemy-heavy", "assets/images/sprites/enemy-heavy.png", { frameWidth: 48, frameHeight: 48 });
    this.load.spritesheet("game-fortress", "assets/images/sprites/fortress.png", { frameWidth: 48, frameHeight: 48 });
    this.load.spritesheet("game-player-one", "assets/images/sprites/player-one.png", { frameWidth: 48, frameHeight: 48 });
    this.load.spritesheet("game-player-two", "assets/images/sprites/player-two.png", { frameWidth: 48, frameHeight: 48 });
    this.load.spritesheet("game-points", "assets/images/sprites/game-points.png", { frameWidth: 48, frameHeight: 48 });
    this.load.spritesheet("game-spawn-blink", "assets/images/sprites/spawn-blink.png", { frameWidth: 48, frameHeight: 48 });
    this.load.spritesheet("game-tank-explosion", "assets/images/sprites/tank-explosion.png", { frameWidth: 96, frameHeight: 96 });

    this.load.image("game-enemies-count", "assets/images/sprites/logo-enemies.png");
    this.load.image("game-game-over", "assets/images/sprites/logo-game-over.png");
    this.load.image("game-level-count", "assets/images/sprites/logo-flag.png");
    this.load.image("game-lives-count", "assets/images/sprites/logo-lives.png");
    this.load.image("game-spawn-point", "assets/images/sprites/spawn-point.png");
  }

  public create(): void {

    this.cursors = this.input.keyboard.createCursorKeys();
    this.resetCursorKeys();

    this.background = this.add.image(0, 0, "game-background");
    this.background.setOrigin(0, 0);

    const map = this.make.tilemap({ key: this.filesBaseKey + "-tilemap" });
    const tileSet = map.addTilesetImage("game-tileset", "game-tileset");
    this.frameLayer = map.createStaticLayer("frame-layer", tileSet, 0, 0);
    this.frameLayer.setCollisionBetween(1, 9999, true, true);
    this.gameLayer = map.createDynamicLayer("game-layer", tileSet, 0, 0);
    this.gameLayer.setCollisionBetween(1, 9999, true, true);
    const aboveLayer = map.createStaticLayer("above-layer", tileSet, 0, 0).setDepth(2);

    this.bulletsEnemies = this.physics.add.group();
    this.bulletsPlayer1 = this.physics.add.group();
    this.bulletsPlayer2 = this.physics.add.group();

    this.enemies = this.physics.add.group();

    this.fortress = this.physics.add.staticSprite(360, 648, "game-fortress");
    this.fortress.setBounce(0, 0);
    this.fortress.setCollideWorldBounds(true);
    this.fortress.setImmovable(true);

    this.player1 = this.physics.add.sprite(264, 648, "game-player-one");
    this.player1.setBounce(0, 0);
    this.player1.setCollideWorldBounds(true);
    this.player1.setData("name", "player-one");
    this.player1.setImmovable(true);

    this.player2 = this.physics.add.sprite(456, 648, "game-player-two");
    this.player2.setBounce(0, 0);
    this.player2.setCollideWorldBounds(true);
    this.player2.setData("name", "player-two");
    // this.player2.setImmovable(true);

    this.logoGameOver = this.add.image(360, 744, "game-game-over").setDepth(3);
    this.logoLevelCount = this.add.image(720, 576, "game-level-count");
    this.textLevelCount = this.add.bitmapText(720 , 600, "console-font", this.gameProgress.stageNumber.toString(), 24);
    this.textLevelCount.setTint(0x111111);
    this.logoLivesCount1 = this.add.image(708, 444, "game-lives-count");
    this.textLivesCount1A = this.add.bitmapText(696, 408, "console-font", "IP", 24);
    this.textLivesCount1A.setTint(0x111111);
    this.textLivesCount1B = this.add.bitmapText(724, 432, "console-font", this.gameProgress.playerOneLives.toString(), 24);
    this.textLivesCount1B.setTint(0x111111);
    this.logoLivesCount2 = this.add.image(708, 516, "game-lives-count");
    this.textLivesCount2A = this.add.bitmapText(696, 480, "console-font", "#P", 24);
    this.textLivesCount2A.setTint(0x111111);
    this.textLivesCount2B = this.add.bitmapText(724, 504, "console-font", this.gameProgress.playerTwoLives.toString(), 24);
    this.textLivesCount2B.setTint(0x111111);
    this.logoEnemiesCount = this.add.group();
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 2; j++) {
        this.logoEnemiesCount.create(708 + (j * 24), 84 + (i * 24), "game-enemies-count");
      }
    }

    BulletAnimations.create(this);
    EnemiesHeavyAnimations.create(this);
    EnemiesRegularAnimations.create(this);
    EnemiesShooterAnimations.create(this);
    EnemiesSpeedyAnimations.create(this);
    FortressAnimations.create(this);
    PlayerOneAnimations.create(this);
    PlayerTwoAnimations.create(this);
    SpawnPointAnimations.create(this);

    this.physics.add.collider(this.player1, this.player2);
    this.physics.add.collider(this.player1, this.frameLayer);
    this.physics.add.collider(this.player2, this.frameLayer);
    this.physics.add.collider(this.player1, this.gameLayer);
    this.physics.add.collider(this.player2, this.gameLayer);
    this.physics.add.collider(this.player1, this.fortress);
    this.physics.add.collider(this.player2, this.fortress);
    this.physics.add.collider(this.player1, this.enemies);
    this.physics.add.collider(this.player2, this.enemies);
    this.physics.add.collider(this.enemies, this.frameLayer);
    this.physics.add.collider(this.enemies, this.gameLayer);
    this.physics.add.collider(this.enemies, this.fortress);
    this.physics.add.collider(this.bulletsPlayer1, this.player2, this.collitionDestroyBullet, null, this);
    this.physics.add.collider(this.bulletsPlayer2, this.player1);
    this.physics.add.collider(this.bulletsPlayer1, this.frameLayer, this.collitionDestroyBullet, null, this);
    this.physics.add.collider(this.bulletsPlayer2, this.frameLayer);
    this.physics.add.collider(this.bulletsPlayer1, this.gameLayer, this.collitionDestroyGameLayer, null, this);
    this.physics.add.collider(this.bulletsPlayer2, this.gameLayer);
    this.physics.add.collider(this.bulletsPlayer1, this.fortress, this.collitionDestroyFortress, null, this);
    this.physics.add.collider(this.bulletsPlayer2, this.fortress);
    this.physics.add.collider(this.bulletsPlayer1, this.enemies, this.collitionDestroyEnemy, null, this);
    this.physics.add.collider(this.bulletsPlayer2, this.enemies);
    this.physics.add.collider(this.bulletsPlayer1, this.bulletsEnemies, this.collitionDestroyBullets, null, this);
    this.physics.add.collider(this.bulletsPlayer2, this.bulletsEnemies);
    this.physics.add.collider(this.bulletsEnemies, this.player1, this.collitionDestroyPlayer, null, this);
    this.physics.add.collider(this.bulletsEnemies, this.player2);
    this.physics.add.collider(this.bulletsEnemies, this.frameLayer, this.collitionDestroyBullet, null, this);
    this.physics.add.collider(this.bulletsEnemies, this.gameLayer); // ToDo: FALTA ACA !!!
    this.physics.add.collider(this.bulletsEnemies, this.fortress);

    const dataJSON = this.cache.json.get(this.filesBaseKey + "-script");
    ScriptManager.parse(this, this.enemies, dataJSON, this.enemyCreated, this.logoEnemiesCount);
  }

  public update(time): void {

    if (this.player1.body === undefined) { return; }

    PlayerState.processMovement(this.player1, this.cursors);

    if (this.cursors.space.isDown) {
      this.cursors.space.reset();
      this.createBulletForPlayer1();
    }

    this.enemies.getChildren().forEach((element: Phaser.Physics.Arcade.Sprite) => {

      const enemyName = element.getData("name").toString();
      const enemyMovement = StateMachine.getMovement(enemyName);
      const enemyShooting = StateMachine.getShooting(enemyName);

      EnemiesState.processMovement(element, enemyMovement);
      // if (enemyShooting) { this.createBulletForEnemy(element); }
    });

    if (this.gameOver && !this.sceneEnding)        { this.stageFailed(); }
    if (this.stageCompleted && !this.sceneEnding)  { this.stageSucceeded(); }

    if (this.cursors.shift.isDown && this.gameProgress.stageNumber < this.gameProgress.MAX_STAGE) {
      this.cursors.shift.reset();
      this.stageSucceeded();
    }
    if (this.cursors.shift.isDown && this.gameProgress.stageNumber === this.gameProgress.MAX_STAGE) {
      this.cursors.shift.reset();
      this.stageFailed();
    }
  }

  private enemyCreated(logoEnemiesCount: Phaser.GameObjects.Group) {
    logoEnemiesCount.remove(logoEnemiesCount.getLast(true), true, true);
  }

  private createBulletForPlayer1() {

    if (this.bulletsPlayer1.getLength() > 0) { return; }

    const BULLET_SPEED = 360;
    const BULLET_DELTA = 24 - 1; // -1 for tiles coordinates

    let anim: string = "";
    let posX: number = 0;
    let posY: number = 0;
    let velX: number = 0;
    let velY: number = 0;

    if (PlayerState.isDirectionUp()) {
      anim = "game-anim-bullet-up";
      posX = this.player1.x;
      posY = this.player1.y - BULLET_DELTA;
      velX = 0;
      velY = -BULLET_SPEED;
    }
    if (PlayerState.isDirectionRight()) {
      anim = "game-anim-bullet-right";
      posX = this.player1.x + BULLET_DELTA;
      posY = this.player1.y;
      velX = BULLET_SPEED;
      velY = 0;
    }
    if (PlayerState.isDirectionDown()) {
      anim = "game-anim-bullet-down";
      posX = this.player1.x;
      posY = this.player1.y + BULLET_DELTA;
      velX = 0;
      velY = BULLET_SPEED;
    }
    if (PlayerState.isDirectionLeft()) {
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

  private createBulletForEnemy(enemy: Phaser.Physics.Arcade.Sprite) {
    // TODO !!!
  }

  private collitionDestroyBullet(src: Phaser.GameObjects.Sprite, dst: Phaser.GameObjects.Sprite): void {
    if (src.getData !== undefined && src.getData("name") === "bullet") {
      src.anims.play("game-anim-bullet-explosion", true);
      this.time.delayedCall(150, () => { this.bulletsPlayer1.remove(src, true, true); });
    }
    if (dst.getData !== undefined && dst.getData("name") === "bullet") {
      dst.anims.play("game-anim-bullet-explosion", true);
      this.time.delayedCall(150, () => { this.bulletsPlayer1.remove(dst, true, true); });
    }
  }

  private collitionDestroyBullets(src: Phaser.GameObjects.Sprite, dst: Phaser.GameObjects.Sprite): void {
    this.bulletsPlayer1.remove(src, true, true);
    this.bulletsEnemies.remove(dst, true, true);
  }

  private collitionDestroyEnemy(src: Phaser.Physics.Arcade.Sprite, dst: Phaser.Physics.Arcade.Sprite): void {

    let anim = "";
    const type = dst.getData("type");

    if (type === "regular") {
      this.gameProgress.playerOneRegularsCount += 1;
      anim = "game-anim-regular-explosion";
    } else if (type === "speedy") {
      this.gameProgress.playerOneSpeediesCount += 1;
      anim = "game-anim-speedy-explosion";
    } else if (type === "shooter") {
      this.gameProgress.playerOneShootersCount += 1;
      anim = "game-anim-shooter-explosion";
    } else if (type === "heavy") {
      this.gameProgress.playerOneHeaviesCount += 1;
      anim = "game-anim-heavy-explosion";
    }

    src.anims.play("game-anim-bullet-explosion", true);
    this.time.delayedCall(150, () => {
      this.bulletsPlayer1.remove(src, true, true);
    });

    // (dst.body as Phaser.Physics.Arcade.Body).enable = false;
    // dst.anims.play("game-anim-regular-explosion", true);
    dst.anims.play("game-anim-bullet-explosion", true);

    this.time.delayedCall(1000, () => {
      this.enemies.remove(dst, true, true);
      this.checkStageCompleted();
    });
  }

  private collitionDestroyFortress(src: Phaser.GameObjects.Sprite, dst: Phaser.GameObjects.Sprite): void {
    this.fortress.anims.play("game-anim-fortress-destroyed");
    this.bulletsPlayer1.remove(dst, true, true);
    this.bulletsEnemies.remove(dst, true, true);

    this.gameOver = true;
  }

  private collitionDestroyGameLayer(src: Phaser.GameObjects.Sprite, dst: Phaser.GameObjects.Sprite): void {

    const tileXY: Phaser.Math.Vector2 = this.gameLayer.worldToTileXY(src.x, src.y);

    src.anims.play("game-anim-bullet-explosion", true);
    this.time.delayedCall(150, () => { this.bulletsPlayer1.remove(src, true, true); });

    // BUG: es la dire de la bala !! no del player al momento (muy posterior) en el que esta impacta
    if (PlayerState.isDirectionUp()) {
      this.gameLayer.removeTileAt(tileXY.x + 1, tileXY.y - 1);
      this.gameLayer.removeTileAt(tileXY.x, tileXY.y - 1);
      this.gameLayer.removeTileAt(tileXY.x - 1, tileXY.y - 1);
      this.gameLayer.removeTileAt(tileXY.x - 2, tileXY.y - 1);
    }
    if (PlayerState.isDirectionRight()) {
      this.gameLayer.removeTileAt(tileXY.x + 1, tileXY.y - 2);
      this.gameLayer.removeTileAt(tileXY.x + 1, tileXY.y - 1);
      this.gameLayer.removeTileAt(tileXY.x + 1, tileXY.y);
      this.gameLayer.removeTileAt(tileXY.x + 1, tileXY.y + 1);
    }
    if (PlayerState.isDirectionDown()) {
      this.gameLayer.removeTileAt(tileXY.x + 1, tileXY.y + 1);
      this.gameLayer.removeTileAt(tileXY.x, tileXY.y + 1);
      this.gameLayer.removeTileAt(tileXY.x - 1, tileXY.y + 1);
      this.gameLayer.removeTileAt(tileXY.x - 2, tileXY.y + 1);
    }
    if (PlayerState.isDirectionLeft()) {
      this.gameLayer.removeTileAt(tileXY.x - 1, tileXY.y - 2);
      this.gameLayer.removeTileAt(tileXY.x - 1, tileXY.y - 1);
      this.gameLayer.removeTileAt(tileXY.x - 1, tileXY.y);
      this.gameLayer.removeTileAt(tileXY.x - 1, tileXY.y + 1);
    }
  }

  private collitionDestroyPlayer(src: Phaser.GameObjects.Sprite, dst: Phaser.GameObjects.Sprite): void {
    // .
  }

  private checkStageCompleted(): void {
    if (this.logoEnemiesCount.getLength() === 0 && this.enemies.getLength() === 0) {
      this.stageCompleted = true;
    }
  }

  private resetCursorKeys(): void {
    this.cursors.down.reset();
    this.cursors.left.reset();
    this.cursors.right.reset();
    this.cursors.shift.reset();
    this.cursors.space.reset();
    this.cursors.up.reset();
  }

  private stageFailed() {
    if (this.sceneEnding) { return; }
    this.sceneEnding = true;

    this.tweens.add({ duration: 2000, ease: "Back", repeat: 0, targets: this.logoGameOver, y: "342", yoyo: false });
    this.time.delayedCall(3000, () => { this.scene.start("GameOverScene"); });
  }

  private stageSucceeded() {
    if (this.sceneEnding) { return; }
    this.sceneEnding = true;

    this.time.delayedCall(2000, () => {
      this.resetCursorKeys();
      this.scene.start("ScoresScene", this.gameProgress); });
  }
}
