webpackJsonp([0],{

/***/ 1078:
/*!**************************************!*\
  !*** ./src/scenes/gameover-scene.ts ***!
  \**************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 // tslint:disable-next-line: no-reference
/// <reference path="../../types/phaser.d.ts" />

var __extends = this && this.__extends || function () {
  var extendStatics = Object.setPrototypeOf || {
    __proto__: []
  } instanceof Array && function (d, b) {
    d.__proto__ = b;
  } || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
  };

  return function (d, b) {
    extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var GameOverScene =
/** @class */
function (_super) {
  __extends(GameOverScene, _super);

  function GameOverScene() {
    return _super.call(this, {
      key: "GameOverScene"
    }) || this;
  }

  GameOverScene.prototype.init = function (params) {// .
  };

  GameOverScene.prototype.preload = function () {
    this.load.image("gameover-background", "assets/images/backgrounds/gameover-background.png");
  };

  GameOverScene.prototype.create = function () {
    var _this = this;

    this.background = this.add.image(0, 0, "gameover-background").setOrigin(0, 0);
    this.cameras.main.setScroll(0, -720);
    this.cameras.main.pan(384, 360, 2000, "Linear", false);
    this.time.delayedCall(3000, function () {
      _this.scene.start("WelcomeScene");
    });
  };

  GameOverScene.prototype.update = function (time) {// .
  };

  return GameOverScene;
}(Phaser.Scene);

exports.GameOverScene = GameOverScene;

/***/ }),

/***/ 1079:
/*!************************************!*\
  !*** ./src/scenes/scores-scene.ts ***!
  \************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 // tslint:disable-next-line: no-reference
/// <reference path="../../types/phaser.d.ts" />

var __extends = this && this.__extends || function () {
  var extendStatics = Object.setPrototypeOf || {
    __proto__: []
  } instanceof Array && function (d, b) {
    d.__proto__ = b;
  } || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
  };

  return function (d, b) {
    extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var ScoresScene =
/** @class */
function (_super) {
  __extends(ScoresScene, _super);

  function ScoresScene() {
    return _super.call(this, {
      key: "ScoresScene"
    }) || this;
  }

  ScoresScene.prototype.init = function (params) {
    this.gameProgress = params;
    this.gameProgress.calculateStageStats();
  };

  ScoresScene.prototype.preload = function () {
    this.load.image("scores-background", "assets/images/backgrounds/scores-background.png");
  };

  ScoresScene.prototype.create = function () {
    var _this = this;

    var defaultTankMessage = "     PTS   ";
    var defaultTotalMessage = "   TOTAL   ";
    this.background = this.add.image(0, 0, "scores-background").setOrigin(0, 0);
    this.textStageNumber = this.add.bitmapText(292, 119, "console-font", "STAGE  " + this.gameProgress.stageNumber, 24);
    this.textStageNumber.setTint(0xEEEEEE);
    var msgPlayerOnePoints = this.buildPlayerPoints(this.gameProgress.playerOneTotalPoints);
    this.textPlayerOnePoints = this.add.bitmapText(124, 215, "console-font", msgPlayerOnePoints, 24);
    this.textPlayerOnePoints.setTint(0xFFB600);
    this.textPlayerOneRegulars = this.add.bitmapText(76, 287, "console-font", defaultTankMessage, 24);
    this.textPlayerOneRegulars.setTint(0xEEEEEE);
    this.time.delayedCall(500, function () {
      var messagePlayerOneRegulars = _this.buildTanksMessage(_this.gameProgress.playerOneRegularsCount, _this.gameProgress.playerOneRegularsPoints);

      _this.textPlayerOneRegulars.setText(messagePlayerOneRegulars);
    });
    this.textPlayerOneSpeedies = this.add.bitmapText(76, 359, "console-font", defaultTankMessage, 24);
    this.textPlayerOneSpeedies.setTint(0xEEEEEE);
    this.time.delayedCall(1000, function () {
      var msgPlayerOneSpeedies = _this.buildTanksMessage(_this.gameProgress.playerOneSpeediesCount, _this.gameProgress.playerOneSpeediesPoints);

      _this.textPlayerOneSpeedies.setText(msgPlayerOneSpeedies);
    });
    this.textPlayerOneShooters = this.add.bitmapText(76, 431, "console-font", defaultTankMessage, 24);
    this.textPlayerOneShooters.setTint(0xEEEEEE);
    this.time.delayedCall(1500, function () {
      var msgPlayerOneShooters = _this.buildTanksMessage(_this.gameProgress.playerOneShootersCount, _this.gameProgress.playerOneShootersPoints);

      _this.textPlayerOneShooters.setText(msgPlayerOneShooters);
    });
    this.textPlayerOneHeavies = this.add.bitmapText(76, 503, "console-font", defaultTankMessage, 24);
    this.textPlayerOneHeavies.setTint(0xEEEEEE);
    this.time.delayedCall(2000, function () {
      var msgPlayerOneHeavies = _this.buildTanksMessage(_this.gameProgress.playerOneHeaviesCount, _this.gameProgress.playerOneHeaviesPoints);

      _this.textPlayerOneHeavies.setText(msgPlayerOneHeavies);
    });
    this.textPlayerOneTotal = this.add.bitmapText(76, 576, "console-font", defaultTotalMessage, 24);
    this.textPlayerOneTotal.setTint(0xEEEEEE);
    this.time.delayedCall(2500, function () {
      var msgPlayerOneTotal = _this.buildTotalMessage(_this.gameProgress.playerOneStageCount);

      _this.textPlayerOneTotal.setText(msgPlayerOneTotal);
    });
    this.time.delayedCall(5000, function () {
      _this.gameProgress.nextStage();

      _this.scene.start("StageNumberScene", _this.gameProgress);
    });
  };

  ScoresScene.prototype.update = function (time) {// .
  };

  ScoresScene.prototype.buildPlayerPoints = function (playerPoints) {
    return this.padRight(playerPoints, 6, " ");
  };

  ScoresScene.prototype.buildTanksMessage = function (tankCount, tankPoints) {
    return this.padRight(tankPoints, 4, " ") + " PTS " + this.padRight(tankCount, 2, " ");
  };

  ScoresScene.prototype.buildTotalMessage = function (tankCount) {
    return "   TOTAL " + this.padRight(tankCount, 2, " ");
  };

  ScoresScene.prototype.padRight = function (text, length, paddingChar) {
    if (paddingChar === void 0) {
      paddingChar = " ";
    }

    var result = text.toString();

    while (result.length < length) {
      result = paddingChar + result;
    }

    return result;
  };

  return ScoresScene;
}(Phaser.Scene);

exports.ScoresScene = ScoresScene;

/***/ }),

/***/ 1080:
/*!***********************************!*\
  !*** ./src/scenes/stage-scene.ts ***!
  \***********************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 // tslint:disable-next-line: no-reference
/// <reference path="../../types/phaser.d.ts" />

var __extends = this && this.__extends || function () {
  var extendStatics = Object.setPrototypeOf || {
    __proto__: []
  } instanceof Array && function (d, b) {
    d.__proto__ = b;
  } || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
  };

  return function (d, b) {
    extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var bullet_animations_1 = __webpack_require__(/*! ../animations/bullet-animations */ 1081);

var enemies_heavy_animations_1 = __webpack_require__(/*! ../animations/enemies-heavy-animations */ 1082);

var enemies_regular_animations_1 = __webpack_require__(/*! ../animations/enemies-regular-animations */ 1083);

var enemies_shooter_animations_1 = __webpack_require__(/*! ../animations/enemies-shooter-animations */ 1084);

var enemies_speedy_animations_1 = __webpack_require__(/*! ../animations/enemies-speedy-animations */ 1085);

var fortress_animations_1 = __webpack_require__(/*! ../animations/fortress-animations */ 1086);

var player_one_animations_1 = __webpack_require__(/*! ../animations/player-one-animations */ 1087);

var player_two_animations_1 = __webpack_require__(/*! ../animations/player-two-animations */ 1088);

var spawn_point_animations_1 = __webpack_require__(/*! ../animations/spawn-point-animations */ 1089);

var script_manager_1 = __webpack_require__(/*! ../scripting/script-manager */ 1090);

var state_machine_1 = __webpack_require__(/*! ../scripting/state-machine */ 435);

var state_bullets_1 = __webpack_require__(/*! ../state-control/state-bullets */ 1093);

var state_enemies_1 = __webpack_require__(/*! ../state-control/state-enemies */ 434);

var state_player_1 = __webpack_require__(/*! ../state-control/state-player */ 1095);

var StageScene =
/** @class */
function (_super) {
  __extends(StageScene, _super);

  function StageScene() {
    return _super.call(this, {
      key: "StageScene"
    }) || this;
  }

  StageScene.prototype.init = function (params) {
    this.gameProgress = params;
    this.gameProgress.resetStageStats();
    this.filesBaseKey = "game-stage" + this.gameProgress.getStageName();
    this.filesBaseUrl = "assets/stages/stage" + this.gameProgress.getStageName();
    this.gameOver = false;
    this.stageCompleted = false;
    this.sceneEnding = false;
  };

  StageScene.prototype.preload = function () {
    this.load.image("game-background", "assets/images/backgrounds/game-background.png");
    this.load.tilemapTiledJSON(this.filesBaseKey + "-tilemap", this.filesBaseUrl + "-tilemap.json");
    this.load.json(this.filesBaseKey + "-script", this.filesBaseUrl + "-script.json");
    this.load.image("game-tileset", "assets/images/tiles/game-tileset.png");
    this.load.spritesheet("game-bullet", "assets/images/sprites/bullet.png", {
      frameWidth: 12,
      frameHeight: 12
    });
    this.load.spritesheet("game-bullet-explosion", "assets/images/sprites/bullet-explosion.png", {
      frameWidth: 48,
      frameHeight: 48
    });
    this.load.spritesheet("game-enemy-regular", "assets/images/sprites/enemy-regular.png", {
      frameWidth: 48,
      frameHeight: 48
    });
    this.load.spritesheet("game-enemy-speedy", "assets/images/sprites/enemy-speedy.png", {
      frameWidth: 48,
      frameHeight: 48
    });
    this.load.spritesheet("game-enemy-shooter", "assets/images/sprites/enemy-shooter.png", {
      frameWidth: 48,
      frameHeight: 48
    });
    this.load.spritesheet("game-enemy-heavy", "assets/images/sprites/enemy-heavy.png", {
      frameWidth: 48,
      frameHeight: 48
    });
    this.load.spritesheet("game-fortress", "assets/images/sprites/fortress.png", {
      frameWidth: 48,
      frameHeight: 48
    });
    this.load.spritesheet("game-player-one", "assets/images/sprites/player-one.png", {
      frameWidth: 48,
      frameHeight: 48
    });
    this.load.spritesheet("game-player-two", "assets/images/sprites/player-two.png", {
      frameWidth: 48,
      frameHeight: 48
    });
    this.load.spritesheet("game-points", "assets/images/sprites/game-points.png", {
      frameWidth: 48,
      frameHeight: 48
    });
    this.load.spritesheet("game-spawn-blink", "assets/images/sprites/spawn-blink.png", {
      frameWidth: 48,
      frameHeight: 48
    });
    this.load.spritesheet("game-tank-explosion", "assets/images/sprites/tank-explosion.png", {
      frameWidth: 96,
      frameHeight: 96
    });
    this.load.image("game-enemies-count", "assets/images/sprites/logo-enemies.png");
    this.load.image("game-game-over", "assets/images/sprites/logo-game-over.png");
    this.load.image("game-level-count", "assets/images/sprites/logo-flag.png");
    this.load.image("game-lives-count", "assets/images/sprites/logo-lives.png");
    this.load.image("game-spawn-point", "assets/images/sprites/spawn-point.png");
  };

  StageScene.prototype.create = function () {
    this.cursors = this.input.keyboard.createCursorKeys();
    this.resetCursorKeys();
    this.background = this.add.image(0, 0, "game-background");
    this.background.setOrigin(0, 0);
    var map = this.make.tilemap({
      key: this.filesBaseKey + "-tilemap"
    });
    var tileSet = map.addTilesetImage("game-tileset", "game-tileset");
    this.frameLayer = map.createStaticLayer("frame-layer", tileSet, 0, 0);
    this.frameLayer.setCollisionBetween(1, 9999, true, true);
    this.gameLayer = map.createDynamicLayer("game-layer", tileSet, 0, 0);
    this.gameLayer.setCollisionBetween(1, 9999, true, true);
    var aboveLayer = map.createStaticLayer("above-layer", tileSet, 0, 0).setDepth(2);
    this.bulletsEnemies = this.physics.add.group();
    this.bulletsPlayer1 = this.physics.add.group();
    this.bulletsPlayer2 = this.physics.add.group();
    this.enemies = this.physics.add.group();
    this.fortress = this.physics.add.staticSprite(360, 648, "game-fortress");
    this.fortress.refreshBody();
    this.fortress.setBounce(0, 0);
    this.fortress.setCollideWorldBounds(true);
    this.fortress.setImmovable(true);
    this.player1 = this.physics.add.sprite(264, 648, "game-player-one");
    this.player1.setBounce(0, 0);
    this.player1.setCollideWorldBounds(true);
    this.player1.setData("name", "player-one");
    this.player1.setImmovable(false);
    this.player2 = this.physics.add.sprite(456, 648, "game-player-two");
    this.player2.setBounce(0, 0);
    this.player2.setCollideWorldBounds(true);
    this.player2.setData("name", "player-two");
    this.player2.setImmovable(false);
    this.logoGameOver = this.add.image(360, 744, "game-game-over").setDepth(3);
    this.logoLevelCount = this.add.image(720, 576, "game-level-count");
    this.textLevelCount = this.add.bitmapText(720, 600, "console-font", this.gameProgress.stageNumber.toString(), 24);
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

    for (var i = 0; i < 10; i++) {
      for (var j = 0; j < 2; j++) {
        this.logoEnemiesCount.create(708 + j * 24, 84 + i * 24, "game-enemies-count");
      }
    }

    this.setupAnimations();
    this.setupCollitions();
    var dataJSON = this.cache.json.get(this.filesBaseKey + "-script");
    script_manager_1.ScriptManager.parse(this, this.enemies, dataJSON, this.enemyCreated, this.logoEnemiesCount);
  };

  StageScene.prototype.update = function (time) {
    var _this = this;

    if (this.player1.body === undefined) {
      return;
    }

    state_player_1.StateControlPlayer.processMovement(this.player1, this.cursors);

    if (this.cursors.space.isDown) {
      this.cursors.space.reset();
      this.createBulletForPlayerOne();
    }

    this.enemies.getChildren().forEach(function (element) {
      var enemyName = element.getData("name").toString();
      var enemyMovement = state_machine_1.StateMachine.getMovement(enemyName);
      var enemyShooting = state_machine_1.StateMachine.getShooting(enemyName);
      state_enemies_1.StateControlEnemies.processMovement(element, enemyMovement);

      if (enemyShooting) {
        _this.createBulletForEnemy(element);
      }
    });

    if (this.gameOver && !this.sceneEnding) {
      this.stageFailed();
    }

    if (this.stageCompleted && !this.sceneEnding) {
      this.stageSucceeded();
    }

    if (this.cursors.shift.isDown && this.gameProgress.stageNumber < this.gameProgress.MAX_STAGE) {
      this.cursors.shift.reset();
      this.stageSucceeded();
    }

    if (this.cursors.shift.isDown && this.gameProgress.stageNumber === this.gameProgress.MAX_STAGE) {
      this.cursors.shift.reset();
      this.stageFailed();
    }
  };

  StageScene.prototype.setupAnimations = function () {
    bullet_animations_1.BulletAnimations.create(this);
    enemies_heavy_animations_1.EnemiesHeavyAnimations.create(this);
    enemies_regular_animations_1.EnemiesRegularAnimations.create(this);
    enemies_shooter_animations_1.EnemiesShooterAnimations.create(this);
    enemies_speedy_animations_1.EnemiesSpeedyAnimations.create(this);
    fortress_animations_1.FortressAnimations.create(this);
    player_one_animations_1.PlayerOneAnimations.create(this);
    player_two_animations_1.PlayerTwoAnimations.create(this);
    spawn_point_animations_1.SpawnPointAnimations.create(this);
  };

  StageScene.prototype.setupCollitions = function () {
    this.physics.add.collider(this.player1, this.player2);
    this.physics.add.collider(this.player1, this.frameLayer);
    this.physics.add.collider(this.player1, this.gameLayer);
    this.physics.add.collider(this.player1, this.fortress);
    this.physics.add.collider(this.player1, this.enemies);
    this.physics.add.collider(this.player2, this.frameLayer);
    this.physics.add.collider(this.player2, this.gameLayer);
    this.physics.add.collider(this.player2, this.fortress);
    this.physics.add.collider(this.player2, this.enemies);
    this.physics.add.collider(this.enemies, this.frameLayer);
    this.physics.add.collider(this.enemies, this.gameLayer);
    this.physics.add.collider(this.enemies, this.fortress);
    this.physics.add.collider(this.bulletsPlayer1, this.player2, this.collitionDestroyBullet, null, this);
    this.physics.add.collider(this.bulletsPlayer1, this.frameLayer, this.collitionDestroyBullet, null, this);
    this.physics.add.collider(this.bulletsPlayer1, this.gameLayer, this.collitionDestroyGameLayer, null, this);
    this.physics.add.collider(this.bulletsPlayer1, this.fortress, this.collitionDestroyFortress, null, this);
    this.physics.add.collider(this.bulletsPlayer1, this.enemies, this.collitionDestroyEnemy, null, this);
    this.physics.add.collider(this.bulletsPlayer1, this.bulletsEnemies, this.collitionDestroyBullets, null, this);
    this.physics.add.collider(this.bulletsPlayer2, this.player1);
    this.physics.add.collider(this.bulletsPlayer2, this.frameLayer);
    this.physics.add.collider(this.bulletsPlayer2, this.gameLayer);
    this.physics.add.collider(this.bulletsPlayer2, this.fortress);
    this.physics.add.collider(this.bulletsPlayer2, this.enemies);
    this.physics.add.collider(this.bulletsPlayer2, this.bulletsEnemies);
    this.physics.add.collider(this.bulletsEnemies, this.player1, this.collitionDestroyPlayer, null, this);
    this.physics.add.collider(this.bulletsEnemies, this.player2);
    this.physics.add.collider(this.bulletsEnemies, this.frameLayer, this.collitionDestroyBullet, null, this);
    this.physics.add.collider(this.bulletsEnemies, this.gameLayer, this.collitionDestroyGameLayer, null, this);
    this.physics.add.collider(this.bulletsEnemies, this.fortress, this.collitionDestroyFortress, null, this);
  };

  StageScene.prototype.createBulletForPlayerOne = function () {
    if (this.bulletsPlayer1.getLength() > 0) {
      return;
    }

    var BULLET_SPEED = 360;
    var BULLET_DELTA = 24 - 1; // -1 for tiles coordinates

    var anim = "";
    var posX = 0;
    var posY = 0;
    var velX = 0;
    var velY = 0;

    if (state_player_1.StateControlPlayer.isDirectionUp()) {
      anim = "game-anim-bullet-up";
      posX = this.player1.x;
      posY = this.player1.y - BULLET_DELTA;
      velX = 0;
      velY = -BULLET_SPEED;
    }

    if (state_player_1.StateControlPlayer.isDirectionRight()) {
      anim = "game-anim-bullet-right";
      posX = this.player1.x + BULLET_DELTA;
      posY = this.player1.y;
      velX = BULLET_SPEED;
      velY = 0;
    }

    if (state_player_1.StateControlPlayer.isDirectionDown()) {
      anim = "game-anim-bullet-down";
      posX = this.player1.x;
      posY = this.player1.y + BULLET_DELTA;
      velX = 0;
      velY = BULLET_SPEED;
    }

    if (state_player_1.StateControlPlayer.isDirectionLeft()) {
      anim = "game-anim-bullet-left";
      posX = this.player1.x - BULLET_DELTA;
      posY = this.player1.y;
      velX = -BULLET_SPEED;
      velY = 0;
    }

    var bullet = this.bulletsPlayer1.create(posX, posY, "game-bullet");
    bullet.setBounce(0, 0);
    bullet.setCollideWorldBounds(true);
    bullet.setData("name", "player-one-bullet");
    bullet.setData("key", Phaser.Math.RND.integer());
    bullet.setVelocity(velX, velY);
    bullet.anims.play(anim, true);
    var bulletDirection = state_player_1.StateControlPlayer.getDirection();
    state_bullets_1.StateControlBullets.register(bullet.getData("name"), bullet.getData("key"), bulletDirection);
  };

  StageScene.prototype.createBulletForEnemy = function (enemy) {
    // if (this.bulletsEnemies.getLength() > 0) { return; }
    // ToDo: Limitar a 1 disparo a la vez por enemigo
    var BULLET_SPEED = 360;
    var BULLET_DELTA = 24 - 1; // -1 for tiles coordinates

    var anim = "";
    var posX = 0;
    var posY = 0;
    var velX = 0;
    var velY = 0;

    if (state_enemies_1.StateControlEnemies.isDirectionUp(enemy)) {
      anim = "game-anim-bullet-up";
      posX = enemy.x;
      posY = enemy.y - BULLET_DELTA;
      velX = 0;
      velY = -BULLET_SPEED;
    }

    if (state_enemies_1.StateControlEnemies.isDirectionRight(enemy)) {
      anim = "game-anim-bullet-right";
      posX = enemy.x + BULLET_DELTA;
      posY = enemy.y;
      velX = BULLET_SPEED;
      velY = 0;
    }

    if (state_enemies_1.StateControlEnemies.isDirectionDown(enemy)) {
      anim = "game-anim-bullet-down";
      posX = enemy.x;
      posY = enemy.y + BULLET_DELTA;
      velX = 0;
      velY = BULLET_SPEED;
    }

    if (state_enemies_1.StateControlEnemies.isDirectionLeft(enemy)) {
      anim = "game-anim-bullet-left";
      posX = enemy.x - BULLET_DELTA;
      posY = enemy.y;
      velX = -BULLET_SPEED;
      velY = 0;
    }

    var bullet = this.bulletsEnemies.create(posX, posY, "game-bullet");
    bullet.setBounce(0, 0);
    bullet.setCollideWorldBounds(true);
    bullet.setData("name", "enemy-bullet");
    bullet.setData("key", Phaser.Math.RND.integer());
    bullet.setVelocity(velX, velY);
    bullet.anims.play(anim, true);
    var bulletDirection = state_enemies_1.StateControlEnemies.getDirection(enemy);
    state_bullets_1.StateControlBullets.register(bullet.getData("name"), bullet.getData("key"), bulletDirection);
  };

  StageScene.prototype.collitionDestroyBullet = function (src, dst) {
    var _this = this;

    if (src.getData !== undefined) {
      src.anims.play("game-anim-bullet-explosion", true); // StateControlBullets.unregister(src.getData("name"), src.getData("key"));

      if (src.getData("name") === "player-one-bullet") {
        this.time.delayedCall(150, function () {
          _this.bulletsPlayer1.remove(src, true, true);
        });
      }

      if (src.getData("name") === "enemy-bullet") {
        this.time.delayedCall(150, function () {
          _this.bulletsEnemies.remove(src, true, true);
        });
      }
    }

    if (dst.getData !== undefined) {
      dst.anims.play("game-anim-bullet-explosion", true); // StateControlBullets.unregister(dst.getData("name"), dst.getData("key"));

      if (dst.getData !== undefined && dst.getData("name") === "player-one-bullet") {
        this.time.delayedCall(150, function () {
          _this.bulletsPlayer1.remove(dst, true, true);
        });
      }

      if (dst.getData !== undefined && dst.getData("name") === "enemy-bullet") {
        this.time.delayedCall(150, function () {
          _this.bulletsEnemies.remove(dst, true, true);
        });
      }
    }
  };

  StageScene.prototype.collitionDestroyBullets = function (src, dst) {
    this.bulletsPlayer1.remove(src, true, true);
    this.bulletsEnemies.remove(dst, true, true);
  };

  StageScene.prototype.collitionDestroyEnemy = function (src, dst) {
    var _this = this;

    src.anims.play("game-anim-bullet-explosion", true);
    this.time.delayedCall(150, function () {
      _this.bulletsPlayer1.remove(src, true, true);
    });
    var type = dst.getData("type");
    var anim = "game-anim-" + type + "-explosion";

    if (type === "regular") {
      this.gameProgress.playerOneRegularsCount += 1;
    } else if (type === "speedy") {
      this.gameProgress.playerOneSpeediesCount += 1;
    } else if (type === "shooter") {
      this.gameProgress.playerOneShootersCount += 1;
    } else if (type === "heavy") {
      this.gameProgress.playerOneHeaviesCount += 1;
    }

    dst.body.enable = false;
    dst.setData("stop", true);
    dst.anims.play(anim, true);
    this.time.delayedCall(1000, function () {
      _this.enemies.remove(dst, true, true);

      _this.checkStageCompleted();
    });
  };

  StageScene.prototype.collitionDestroyFortress = function (src, dst) {
    this.fortress.anims.play("game-anim-fortress-destroyed");
    this.bulletsPlayer1.remove(dst, true, true);
    this.bulletsEnemies.remove(dst, true, true);
    this.gameOver = true;
  };

  StageScene.prototype.collitionDestroyGameLayer = function (src, dst) {
    var _this = this;

    src.anims.play("game-anim-bullet-explosion", true);
    var name = src.getData("name");
    var tileXY = this.gameLayer.worldToTileXY(src.x, src.y);

    if (name === "player-one-bullet") {
      this.time.delayedCall(150, function () {
        _this.bulletsPlayer1.remove(src, true, true);
      });
    }

    if (name === "enemy-bullet") {
      this.time.delayedCall(150, function () {
        _this.bulletsEnemies.remove(src, true, true);
      });
    } // console.log("dir", StateControlBullets.getDirection(src));


    if (state_bullets_1.StateControlBullets.isDirectionUp(src)) {
      this.gameLayer.removeTileAt(tileXY.x + 1, tileXY.y - 1);
      this.gameLayer.removeTileAt(tileXY.x, tileXY.y - 1);
      this.gameLayer.removeTileAt(tileXY.x - 1, tileXY.y - 1);
      this.gameLayer.removeTileAt(tileXY.x - 2, tileXY.y - 1);
    }

    if (state_bullets_1.StateControlBullets.isDirectionRight(src)) {
      this.gameLayer.removeTileAt(tileXY.x + 1, tileXY.y - 2);
      this.gameLayer.removeTileAt(tileXY.x + 1, tileXY.y - 1);
      this.gameLayer.removeTileAt(tileXY.x + 1, tileXY.y);
      this.gameLayer.removeTileAt(tileXY.x + 1, tileXY.y + 1);
    }

    if (state_bullets_1.StateControlBullets.isDirectionDown(src)) {
      this.gameLayer.removeTileAt(tileXY.x + 1, tileXY.y + 1);
      this.gameLayer.removeTileAt(tileXY.x, tileXY.y + 1);
      this.gameLayer.removeTileAt(tileXY.x - 1, tileXY.y + 1);
      this.gameLayer.removeTileAt(tileXY.x - 2, tileXY.y + 1);
    }

    if (state_bullets_1.StateControlBullets.isDirectionLeft(src)) {
      this.gameLayer.removeTileAt(tileXY.x - 1, tileXY.y - 2);
      this.gameLayer.removeTileAt(tileXY.x - 1, tileXY.y - 1);
      this.gameLayer.removeTileAt(tileXY.x - 1, tileXY.y);
      this.gameLayer.removeTileAt(tileXY.x - 1, tileXY.y + 1);
    }
  };

  StageScene.prototype.collitionDestroyPlayer = function (src, dst) {
    dst.anims.play("game-anim-bullet-explosion", true);
    dst.body.enable = false;
    this.bulletsEnemies.remove(dst, true, true);
    this.gameProgress.playerOneLives -= 1;

    if (this.gameProgress.playerOneLives >= 0) {
      this.textLivesCount1B.setText(this.gameProgress.playerOneLives.toString());
      this.player1.setPosition(264, 648);
    } else {
      this.gameOver = true;
    }
  };

  StageScene.prototype.enemyCreated = function (logoEnemiesCount) {
    logoEnemiesCount.remove(logoEnemiesCount.getLast(true), true, true);
  };

  StageScene.prototype.resetCursorKeys = function () {
    this.cursors.down.reset();
    this.cursors.left.reset();
    this.cursors.right.reset();
    this.cursors.shift.reset();
    this.cursors.space.reset();
    this.cursors.up.reset();
  };

  StageScene.prototype.checkStageCompleted = function () {
    if (this.logoEnemiesCount.getLength() === 0 && this.enemies.getLength() === 0) {
      this.stageCompleted = true;
    }
  };

  StageScene.prototype.stageFailed = function () {
    var _this = this;

    if (this.sceneEnding) {
      return;
    }

    this.sceneEnding = true;
    this.tweens.add({
      duration: 2000,
      ease: "Back",
      repeat: 0,
      targets: this.logoGameOver,
      y: "342",
      yoyo: false
    });
    this.time.delayedCall(3000, function () {
      _this.scene.start("GameOverScene");
    });
  };

  StageScene.prototype.stageSucceeded = function () {
    var _this = this;

    if (this.sceneEnding) {
      return;
    }

    this.sceneEnding = true;
    this.time.delayedCall(2000, function () {
      _this.resetCursorKeys();

      _this.scene.start("ScoresScene", _this.gameProgress);
    });
  };

  return StageScene;
}(Phaser.Scene);

exports.StageScene = StageScene;

/***/ }),

/***/ 1081:
/*!*********************************************!*\
  !*** ./src/animations/bullet-animations.ts ***!
  \*********************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 // tslint:disable-next-line: no-reference
/// <reference path="../../types/phaser.d.ts" />

Object.defineProperty(exports, "__esModule", {
  value: true
});

var BulletAnimations =
/** @class */
function () {
  function BulletAnimations() {}

  BulletAnimations.create = function (scene) {
    var BULLET_UP = "game-anim-bullet-up";
    var BULLET_RIGHT = "game-anim-bullet-right";
    var BULLET_DOWN = "game-anim-bullet-down";
    var BULLET_LEFT = "game-anim-bullet-left";
    var BULLET_EXPLOSION = "game-anim-bullet-explosion";
    var KEY_BULLET = "game-bullet";
    var KEY_BULLET_EXPLOSION = "game-bullet-explosion";

    if (scene.anims.get(BULLET_UP) === undefined) {
      scene.anims.create({
        frameRate: 10,
        frames: scene.anims.generateFrameNumbers(KEY_BULLET, {
          start: 0,
          end: 0
        }),
        key: BULLET_UP,
        repeat: 0
      });
    }

    if (scene.anims.get(BULLET_RIGHT) === undefined) {
      scene.anims.create({
        frameRate: 10,
        frames: scene.anims.generateFrameNumbers(KEY_BULLET, {
          start: 1,
          end: 1
        }),
        key: BULLET_RIGHT,
        repeat: 0
      });
    }

    if (scene.anims.get(BULLET_DOWN) === undefined) {
      scene.anims.create({
        frameRate: 10,
        frames: scene.anims.generateFrameNumbers(KEY_BULLET, {
          start: 2,
          end: 2
        }),
        key: BULLET_DOWN,
        repeat: 0
      });
    }

    if (scene.anims.get(BULLET_LEFT) === undefined) {
      scene.anims.create({
        frameRate: 10,
        frames: scene.anims.generateFrameNumbers(KEY_BULLET, {
          start: 3,
          end: 3
        }),
        key: BULLET_LEFT,
        repeat: 0
      });
    }

    if (scene.anims.get(BULLET_EXPLOSION) === undefined) {
      scene.anims.create({
        frameRate: 20,
        frames: scene.anims.generateFrameNumbers(KEY_BULLET_EXPLOSION, {
          start: 0,
          end: 3
        }),
        key: BULLET_EXPLOSION,
        repeat: 0
      });
    }
  };

  return BulletAnimations;
}();

exports.BulletAnimations = BulletAnimations;

/***/ }),

/***/ 1082:
/*!****************************************************!*\
  !*** ./src/animations/enemies-heavy-animations.ts ***!
  \****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 // tslint:disable-next-line: no-reference
/// <reference path="../../types/phaser.d.ts" />

Object.defineProperty(exports, "__esModule", {
  value: true
});

var EnemiesHeavyAnimations =
/** @class */
function () {
  function EnemiesHeavyAnimations() {}

  EnemiesHeavyAnimations.create = function (scene) {
    var HEAVY_ENEMY_UP = "game-anim-heavy-enemy-up";
    var HEAVY_ENEMY_RIGHT = "game-anim-heavy-enemy-right";
    var HEAVY_ENEMY_DOWN = "game-anim-heavy-enemy-down";
    var HEAVY_ENEMY_LEFT = "game-anim-heavy-enemy-left";
    var HEAVY_ENEMY_EXPLOSION = "game-anim-heavy-explosion";
    var KEY_ENEMY_HEAVY = "game-enemy-heavy";
    var KEY_TANK_EXPLOSION = "game-tank-explosion";

    if (scene.anims.get(HEAVY_ENEMY_UP) === undefined) {
      scene.anims.create({
        frameRate: 10,
        frames: scene.anims.generateFrameNumbers(KEY_ENEMY_HEAVY, {
          start: 0,
          end: 1
        }),
        key: HEAVY_ENEMY_UP,
        repeat: 0
      });
    }

    if (scene.anims.get(HEAVY_ENEMY_RIGHT) === undefined) {
      scene.anims.create({
        frameRate: 10,
        frames: scene.anims.generateFrameNumbers(KEY_ENEMY_HEAVY, {
          start: 2,
          end: 3
        }),
        key: HEAVY_ENEMY_RIGHT,
        repeat: 0
      });
    }

    if (scene.anims.get(HEAVY_ENEMY_DOWN) === undefined) {
      scene.anims.create({
        frameRate: 10,
        frames: scene.anims.generateFrameNumbers(KEY_ENEMY_HEAVY, {
          start: 4,
          end: 5
        }),
        key: HEAVY_ENEMY_DOWN,
        repeat: 0
      });
    }

    if (scene.anims.get(HEAVY_ENEMY_LEFT) === undefined) {
      scene.anims.create({
        frameRate: 10,
        frames: scene.anims.generateFrameNumbers(KEY_ENEMY_HEAVY, {
          start: 6,
          end: 7
        }),
        key: HEAVY_ENEMY_LEFT,
        repeat: 0
      });
    }

    if (scene.anims.get(HEAVY_ENEMY_EXPLOSION) === undefined) {
      var anim = scene.anims.create({
        frameRate: 9,
        frames: scene.anims.generateFrameNumbers(KEY_TANK_EXPLOSION, {
          start: 0,
          end: 5
        }),
        key: HEAVY_ENEMY_EXPLOSION,
        repeat: 0
      });

      if (anim) {
        var animFrame = scene.anims.generateFrameNumbers("game-points", {
          start: 3,
          end: 3
        });
        anim.addFrame(animFrame);
      }
    }
  };

  return EnemiesHeavyAnimations;
}();

exports.EnemiesHeavyAnimations = EnemiesHeavyAnimations;

/***/ }),

/***/ 1083:
/*!******************************************************!*\
  !*** ./src/animations/enemies-regular-animations.ts ***!
  \******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 // tslint:disable-next-line: no-reference
/// <reference path="../../types/phaser.d.ts" />

Object.defineProperty(exports, "__esModule", {
  value: true
});

var EnemiesRegularAnimations =
/** @class */
function () {
  function EnemiesRegularAnimations() {}

  EnemiesRegularAnimations.create = function (scene) {
    var REGULAR_ENEMY_UP = "game-anim-regular-enemy-up";
    var REGULAR_ENEMY_RIGHT = "game-anim-regular-enemy-right";
    var REGULAR_ENEMY_DOWN = "game-anim-regular-enemy-down";
    var REGULAR_ENEMY_LEFT = "game-anim-regular-enemy-left";
    var REGULAR_ENEMY_EXPLOSION = "game-anim-regular-explosion";
    var KEY_ENEMY_REGULAR = "game-enemy-regular";
    var KEY_TANK_EXPLOSION = "game-tank-explosion";

    if (scene.anims.get(REGULAR_ENEMY_UP) === undefined) {
      scene.anims.create({
        frameRate: 10,
        frames: scene.anims.generateFrameNumbers(KEY_ENEMY_REGULAR, {
          start: 0,
          end: 1
        }),
        key: REGULAR_ENEMY_UP,
        repeat: 0
      });
    }

    if (scene.anims.get(REGULAR_ENEMY_RIGHT) === undefined) {
      scene.anims.create({
        frameRate: 10,
        frames: scene.anims.generateFrameNumbers(KEY_ENEMY_REGULAR, {
          start: 2,
          end: 3
        }),
        key: REGULAR_ENEMY_RIGHT,
        repeat: 0
      });
    }

    if (scene.anims.get(REGULAR_ENEMY_DOWN) === undefined) {
      scene.anims.create({
        frameRate: 10,
        frames: scene.anims.generateFrameNumbers(KEY_ENEMY_REGULAR, {
          start: 4,
          end: 5
        }),
        key: REGULAR_ENEMY_DOWN,
        repeat: 0
      });
    }

    if (scene.anims.get(REGULAR_ENEMY_LEFT) === undefined) {
      scene.anims.create({
        frameRate: 10,
        frames: scene.anims.generateFrameNumbers(KEY_ENEMY_REGULAR, {
          start: 6,
          end: 7
        }),
        key: REGULAR_ENEMY_LEFT,
        repeat: 0
      });
    }

    if (scene.anims.get(REGULAR_ENEMY_EXPLOSION) === undefined) {
      var anim = scene.anims.create({
        frameRate: 9,
        frames: scene.anims.generateFrameNumbers(KEY_TANK_EXPLOSION, {
          start: 0,
          end: 5
        }),
        key: REGULAR_ENEMY_EXPLOSION,
        repeat: 0
      });

      if (anim) {
        var animFrame = scene.anims.generateFrameNumbers("game-points", {
          start: 0,
          end: 0
        });
        anim.addFrame(animFrame);
      }
    }
  };

  return EnemiesRegularAnimations;
}();

exports.EnemiesRegularAnimations = EnemiesRegularAnimations;

/***/ }),

/***/ 1084:
/*!******************************************************!*\
  !*** ./src/animations/enemies-shooter-animations.ts ***!
  \******************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 // tslint:disable-next-line: no-reference
/// <reference path="../../types/phaser.d.ts" />

Object.defineProperty(exports, "__esModule", {
  value: true
});

var EnemiesShooterAnimations =
/** @class */
function () {
  function EnemiesShooterAnimations() {}

  EnemiesShooterAnimations.create = function (scene) {
    var SHOOTER_ENEMY_UP = "game-anim-shooter-enemy-up";
    var SHOOTER_ENEMY_RIGHT = "game-anim-shooter-enemy-right";
    var SHOOTER_ENEMY_DOWN = "game-anim-shooter-enemy-down";
    var SHOOTER_ENEMY_LEFT = "game-anim-shooter-enemy-left";
    var SHOOTER_ENEMY_EXPLOSION = "game-anim-shooter-explosion";
    var KEY_ENEMY_SHOOTER = "game-enemy-shooter";
    var KEY_TANK_EXPLOSION = "game-tank-explosion";

    if (scene.anims.get(SHOOTER_ENEMY_UP) === undefined) {
      scene.anims.create({
        frameRate: 10,
        frames: scene.anims.generateFrameNumbers(KEY_ENEMY_SHOOTER, {
          start: 0,
          end: 1
        }),
        key: SHOOTER_ENEMY_UP,
        repeat: 0
      });
    }

    if (scene.anims.get(SHOOTER_ENEMY_RIGHT) === undefined) {
      scene.anims.create({
        frameRate: 10,
        frames: scene.anims.generateFrameNumbers(KEY_ENEMY_SHOOTER, {
          start: 2,
          end: 3
        }),
        key: SHOOTER_ENEMY_RIGHT,
        repeat: 0
      });
    }

    if (scene.anims.get(SHOOTER_ENEMY_DOWN) === undefined) {
      scene.anims.create({
        frameRate: 10,
        frames: scene.anims.generateFrameNumbers(KEY_ENEMY_SHOOTER, {
          start: 4,
          end: 5
        }),
        key: SHOOTER_ENEMY_DOWN,
        repeat: 0
      });
    }

    if (scene.anims.get(SHOOTER_ENEMY_LEFT) === undefined) {
      scene.anims.create({
        frameRate: 10,
        frames: scene.anims.generateFrameNumbers(KEY_ENEMY_SHOOTER, {
          start: 6,
          end: 7
        }),
        key: SHOOTER_ENEMY_LEFT,
        repeat: 0
      });
    }

    if (scene.anims.get(SHOOTER_ENEMY_EXPLOSION) === undefined) {
      var anim = scene.anims.create({
        frameRate: 9,
        frames: scene.anims.generateFrameNumbers(KEY_TANK_EXPLOSION, {
          start: 0,
          end: 5
        }),
        key: SHOOTER_ENEMY_EXPLOSION,
        repeat: 0
      });

      if (anim) {
        var animFrame = scene.anims.generateFrameNumbers("game-points", {
          start: 2,
          end: 2
        });
        anim.addFrame(animFrame);
      }
    }
  };

  return EnemiesShooterAnimations;
}();

exports.EnemiesShooterAnimations = EnemiesShooterAnimations;

/***/ }),

/***/ 1085:
/*!*****************************************************!*\
  !*** ./src/animations/enemies-speedy-animations.ts ***!
  \*****************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 // tslint:disable-next-line: no-reference
/// <reference path="../../types/phaser.d.ts" />

Object.defineProperty(exports, "__esModule", {
  value: true
});

var EnemiesSpeedyAnimations =
/** @class */
function () {
  function EnemiesSpeedyAnimations() {}

  EnemiesSpeedyAnimations.create = function (scene) {
    var SPEEDY_ENEMY_UP = "game-anim-speedy-enemy-up";
    var SPEEDY_ENEMY_RIGHT = "game-anim-speedy-enemy-right";
    var SPEEDY_ENEMY_DOWN = "game-anim-speedy-enemy-down";
    var SPEEDY_ENEMY_LEFT = "game-anim-speedy-enemy-left";
    var SPEEDY_ENEMY_EXPLOSION = "game-anim-speedy-explosion";
    var KEY_ENEMY_SPEEDY = "game-enemy-speedy";
    var KEY_TANK_EXPLOSION = "game-tank-explosion";

    if (scene.anims.get(SPEEDY_ENEMY_UP) === undefined) {
      scene.anims.create({
        frameRate: 10,
        frames: scene.anims.generateFrameNumbers(KEY_ENEMY_SPEEDY, {
          start: 0,
          end: 1
        }),
        key: SPEEDY_ENEMY_UP,
        repeat: 0
      });
    }

    if (scene.anims.get(SPEEDY_ENEMY_RIGHT) === undefined) {
      scene.anims.create({
        frameRate: 10,
        frames: scene.anims.generateFrameNumbers(KEY_ENEMY_SPEEDY, {
          start: 2,
          end: 3
        }),
        key: SPEEDY_ENEMY_RIGHT,
        repeat: 0
      });
    }

    if (scene.anims.get(SPEEDY_ENEMY_DOWN) === undefined) {
      scene.anims.create({
        frameRate: 10,
        frames: scene.anims.generateFrameNumbers(KEY_ENEMY_SPEEDY, {
          start: 4,
          end: 5
        }),
        key: SPEEDY_ENEMY_DOWN,
        repeat: 0
      });
    }

    if (scene.anims.get(SPEEDY_ENEMY_LEFT) === undefined) {
      scene.anims.create({
        frameRate: 10,
        frames: scene.anims.generateFrameNumbers(KEY_ENEMY_SPEEDY, {
          start: 6,
          end: 7
        }),
        key: SPEEDY_ENEMY_LEFT,
        repeat: 0
      });
    }

    if (scene.anims.get(SPEEDY_ENEMY_EXPLOSION) === undefined) {
      var anim = scene.anims.create({
        frameRate: 9,
        frames: scene.anims.generateFrameNumbers(KEY_TANK_EXPLOSION, {
          start: 0,
          end: 5
        }),
        key: SPEEDY_ENEMY_EXPLOSION,
        repeat: 0
      });

      if (anim) {
        var animFrame = scene.anims.generateFrameNumbers("game-points", {
          start: 1,
          end: 1
        });
        anim.addFrame(animFrame);
      }
    }
  };

  return EnemiesSpeedyAnimations;
}();

exports.EnemiesSpeedyAnimations = EnemiesSpeedyAnimations;

/***/ }),

/***/ 1086:
/*!***********************************************!*\
  !*** ./src/animations/fortress-animations.ts ***!
  \***********************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 // tslint:disable-next-line: no-reference
/// <reference path="../../types/phaser.d.ts" />

Object.defineProperty(exports, "__esModule", {
  value: true
});

var FortressAnimations =
/** @class */
function () {
  function FortressAnimations() {}

  FortressAnimations.create = function (scene) {
    var FORTRESS_DESTROYED = "game-anim-fortress-destroyed";
    var KEY_FORTRESS = "game-fortress";

    if (scene.anims.get(FORTRESS_DESTROYED) === undefined) {
      scene.anims.create({
        frameRate: 10,
        frames: scene.anims.generateFrameNumbers(KEY_FORTRESS, {
          start: 1,
          end: 1
        }),
        key: FORTRESS_DESTROYED,
        repeat: 0
      });
    }
  };

  return FortressAnimations;
}();

exports.FortressAnimations = FortressAnimations;

/***/ }),

/***/ 1087:
/*!*************************************************!*\
  !*** ./src/animations/player-one-animations.ts ***!
  \*************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var PlayerOneAnimations =
/** @class */
function () {
  function PlayerOneAnimations() {}

  PlayerOneAnimations.create = function (scene) {
    var PLAYER_ONE_UP = "game-anim-player01-up";
    var PLAYER_ONE_RIGHT = "game-anim-player01-right";
    var PLAYER_ONE_DOWN = "game-anim-player01-down";
    var PLAYER_ONE_LEFT = "game-anim-player01-left";
    var PLAYER_ONE_EXPLOSION = "game-anim-player01-explosion";
    var KEY_PLAYER_ONE = "game-player-one";
    var KEY_TANK_EXPLOSION = "game-tank-explosion";

    if (scene.anims.get(PLAYER_ONE_UP) === undefined) {
      scene.anims.create({
        frameRate: 10,
        frames: scene.anims.generateFrameNumbers(KEY_PLAYER_ONE, {
          start: 0,
          end: 1
        }),
        key: PLAYER_ONE_UP,
        repeat: 0
      });
    }

    if (scene.anims.get(PLAYER_ONE_RIGHT) === undefined) {
      scene.anims.create({
        frameRate: 10,
        frames: scene.anims.generateFrameNumbers(KEY_PLAYER_ONE, {
          start: 2,
          end: 3
        }),
        key: PLAYER_ONE_RIGHT,
        repeat: 0
      });
    }

    if (scene.anims.get(PLAYER_ONE_DOWN) === undefined) {
      scene.anims.create({
        frameRate: 10,
        frames: scene.anims.generateFrameNumbers(KEY_PLAYER_ONE, {
          start: 4,
          end: 5
        }),
        key: PLAYER_ONE_DOWN,
        repeat: 0
      });
    }

    if (scene.anims.get(PLAYER_ONE_LEFT) === undefined) {
      scene.anims.create({
        frameRate: 10,
        frames: scene.anims.generateFrameNumbers(KEY_PLAYER_ONE, {
          start: 6,
          end: 7
        }),
        key: PLAYER_ONE_LEFT,
        repeat: 0
      });
    }

    if (scene.anims.get(PLAYER_ONE_EXPLOSION) === undefined) {
      scene.anims.create({
        frameRate: 9,
        frames: scene.anims.generateFrameNumbers(KEY_TANK_EXPLOSION, {
          start: 0,
          end: 5
        }),
        key: PLAYER_ONE_EXPLOSION,
        repeat: 0
      });
    }
  };

  return PlayerOneAnimations;
}();

exports.PlayerOneAnimations = PlayerOneAnimations;

/***/ }),

/***/ 1088:
/*!*************************************************!*\
  !*** ./src/animations/player-two-animations.ts ***!
  \*************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var PlayerTwoAnimations =
/** @class */
function () {
  function PlayerTwoAnimations() {}

  PlayerTwoAnimations.create = function (scene) {
    var PLAYER_TWO_UP = "game-anim-player02-up";
    var PLAYER_TWO_RIGHT = "game-anim-player02-right";
    var PLAYER_TWO_DOWN = "game-anim-player02-down";
    var PLAYER_TWO_LEFT = "game-anim-player02-left";
    var PLAYER_TWO_EXPLOSION = "game-anim-player02-explosion";
    var KEY_PLAYER_TWO = "game-player-two";
    var KEY_TANK_EXPLOSION = "game-tank-explosion";

    if (scene.anims.get(PLAYER_TWO_UP) === undefined) {
      scene.anims.create({
        frameRate: 10,
        frames: scene.anims.generateFrameNumbers(KEY_PLAYER_TWO, {
          start: 0,
          end: 1
        }),
        key: PLAYER_TWO_UP,
        repeat: 0
      });
    }

    if (scene.anims.get(PLAYER_TWO_RIGHT) === undefined) {
      scene.anims.create({
        frameRate: 10,
        frames: scene.anims.generateFrameNumbers(KEY_PLAYER_TWO, {
          start: 2,
          end: 3
        }),
        key: PLAYER_TWO_RIGHT,
        repeat: 0
      });
    }

    if (scene.anims.get(PLAYER_TWO_DOWN) === undefined) {
      scene.anims.create({
        frameRate: 10,
        frames: scene.anims.generateFrameNumbers(KEY_PLAYER_TWO, {
          start: 4,
          end: 5
        }),
        key: PLAYER_TWO_DOWN,
        repeat: 0
      });
    }

    if (scene.anims.get(PLAYER_TWO_LEFT) === undefined) {
      scene.anims.create({
        frameRate: 10,
        frames: scene.anims.generateFrameNumbers(KEY_PLAYER_TWO, {
          start: 6,
          end: 7
        }),
        key: PLAYER_TWO_LEFT,
        repeat: 0
      });
    }

    if (scene.anims.get(PLAYER_TWO_EXPLOSION) === undefined) {
      scene.anims.create({
        frameRate: 9,
        frames: scene.anims.generateFrameNumbers(KEY_TANK_EXPLOSION, {
          start: 0,
          end: 5
        }),
        key: PLAYER_TWO_EXPLOSION,
        repeat: 0
      });
    }
  };

  return PlayerTwoAnimations;
}();

exports.PlayerTwoAnimations = PlayerTwoAnimations;

/***/ }),

/***/ 1089:
/*!**************************************************!*\
  !*** ./src/animations/spawn-point-animations.ts ***!
  \**************************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 // tslint:disable-next-line: no-reference
/// <reference path="../../types/phaser.d.ts" />

Object.defineProperty(exports, "__esModule", {
  value: true
});

var SpawnPointAnimations =
/** @class */
function () {
  function SpawnPointAnimations() {}

  SpawnPointAnimations.create = function (scene) {
    var SPAWN_POINT_BLINK = "game-anim-spawn-point-blink";
    var KEY_SPAWN_POINT = "game-spawn-blink";

    if (scene.anims.get(SPAWN_POINT_BLINK) === undefined) {
      scene.anims.create({
        frameRate: 16,
        frames: scene.anims.generateFrameNumbers(KEY_SPAWN_POINT, {
          start: 0,
          end: 3
        }),
        hideOnComplete: true,
        key: SPAWN_POINT_BLINK,
        repeat: 1,
        yoyo: true
      });
    }
  };

  return SpawnPointAnimations;
}();

exports.SpawnPointAnimations = SpawnPointAnimations;

/***/ }),

/***/ 1090:
/*!*****************************************!*\
  !*** ./src/scripting/script-manager.ts ***!
  \*****************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 // tslint:disable-next-line: no-reference
/// <reference path="../../types/phaser.d.ts" />

Object.defineProperty(exports, "__esModule", {
  value: true
});

var state_enemies_1 = __webpack_require__(/*! ../state-control/state-enemies */ 434);

var state_machine_1 = __webpack_require__(/*! ./state-machine */ 435);

var ScriptManager =
/** @class */
function () {
  function ScriptManager() {}

  ScriptManager.parse = function (scene, enemies, dataJSON, callback, callbackContext) {
    var _this = this;

    var JSON_KEY_ENEMIES = "enemies";
    var JSON_KEY_NAME = "name";
    var JSON_KEY_TYPE = "type";
    var JSON_KEY_SPAWN = "spawn";
    var JSON_KEY_DELAY = "delay";
    var SPAWN_Y = 72;
    var posX = 0;
    var posY = 0;
    var spriteKey = "";
    this.spawnPointLeft = scene.add.sprite(this.getPosX("left"), SPAWN_Y, "game-spawn-point");
    this.spawnPointCenter = scene.add.sprite(this.getPosX("center"), SPAWN_Y, "game-spawn-point");
    this.spawnPointRight = scene.add.sprite(this.getPosX("right"), SPAWN_Y, "game-spawn-point");
    var enemiesJSON = dataJSON[JSON_KEY_ENEMIES];
    enemiesJSON.forEach(function (element) {
      scene.time.delayedCall(element[JSON_KEY_DELAY], function () {
        var spawnPoint = _this.selectSpawnPoint(element[JSON_KEY_SPAWN]);

        spawnPoint.setAlpha(0.8);
        spawnPoint.setVisible(true);
        spawnPoint.setDepth(1);
        spawnPoint.anims.play("game-anim-spawn-point-blink", true);
        scene.time.delayedCall(900, function () {
          posX = _this.getPosX(element[JSON_KEY_SPAWN]);
          posY = SPAWN_Y;
          spriteKey = _this.getSpriteKey(element[JSON_KEY_TYPE]);
          var enemy = enemies.create(posX, posY, spriteKey, 4);
          enemy.setBounce(0, 0);
          enemy.setCollideWorldBounds(true);
          enemy.setData("name", element[JSON_KEY_NAME]);
          enemy.setData("stop", false);
          enemy.setData("type", element[JSON_KEY_TYPE]);
          enemy.setImmovable(false);
          state_machine_1.StateMachine.register(element[JSON_KEY_NAME]);
          state_enemies_1.StateControlEnemies.register(element[JSON_KEY_NAME]);

          if (callback !== undefined) {
            callback(callbackContext);
          }
        });
      });
    });
  };

  ScriptManager.selectSpawnPoint = function (spawn) {
    spawn = spawn.toLowerCase();

    if (spawn === "left") {
      return this.spawnPointLeft;
    }

    if (spawn === "center") {
      return this.spawnPointCenter;
    }

    if (spawn === "right") {
      return this.spawnPointRight;
    }
  };

  ScriptManager.getPosX = function (spawn) {
    var SPAWN_X_LEFT = 72;
    var SPAWN_X_CENTER = 360;
    var SPAWN_X_RIGHT = 648;
    spawn = spawn.toLowerCase();

    if (spawn === "left") {
      return SPAWN_X_LEFT;
    }

    if (spawn === "center") {
      return SPAWN_X_CENTER;
    }

    if (spawn === "right") {
      return SPAWN_X_RIGHT;
    }
  };

  ScriptManager.getSpriteKey = function (type) {
    var SPRITE_KEY_REGULAR = "game-enemy-regular";
    var SPRITE_KEY_SPEEDY = "game-enemy-speedy";
    var SPRITE_KEY_SHOOTER = "game-enemy-shooter";
    var SPRITE_KEY_HEAVY = "game-enemy-heavy";
    type = type.toLowerCase();

    if (type === "regular") {
      return SPRITE_KEY_REGULAR;
    }

    if (type === "speedy") {
      return SPRITE_KEY_SPEEDY;
    }

    if (type === "shooter") {
      return SPRITE_KEY_SHOOTER;
    }

    if (type === "heavy") {
      return SPRITE_KEY_HEAVY;
    }
  };

  return ScriptManager;
}();

exports.ScriptManager = ScriptManager;

/***/ }),

/***/ 1091:
/*!*********************************************!*\
  !*** ./src/entities/state-control-enemy.ts ***!
  \*********************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var StateControlEnemy =
/** @class */
function () {
  function StateControlEnemy(key) {
    this.key = key;
  }

  StateControlEnemy.prototype.setNewDirection = function (direction) {
    this.previousDirection = this.currentDirection;
    this.currentDirection = direction;
  };

  return StateControlEnemy;
}();

exports.StateControlEnemy = StateControlEnemy;

/***/ }),

/***/ 1092:
/*!*********************************************!*\
  !*** ./src/entities/state-machine-enemy.ts ***!
  \*********************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var StateMachineEnemy =
/** @class */
function () {
  function StateMachineEnemy(key) {
    this.key = key;
  }

  return StateMachineEnemy;
}();

exports.StateMachineEnemy = StateMachineEnemy;

/***/ }),

/***/ 1093:
/*!********************************************!*\
  !*** ./src/state-control/state-bullets.ts ***!
  \********************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 // tslint:disable-next-line: no-reference
/// <reference path="../../types/phaser.d.ts" />

Object.defineProperty(exports, "__esModule", {
  value: true
});

var state_control_bullet_1 = __webpack_require__(/*! ../entities/state-control-bullet */ 1094);

var StateControlBullets =
/** @class */
function () {
  function StateControlBullets() {}

  StateControlBullets.register = function (name, key, direction) {
    if (this.stateControlBullets === undefined) {
      this.stateControlBullets = new Array(0);
    }

    var bullet = new state_control_bullet_1.StateControlBullet(name, key, direction);
    this.stateControlBullets.push(bullet);
  };

  StateControlBullets.unregister = function (name, key) {// TODO: desregistrar disparos !!!
    // this.stateControlBullets.
  };

  StateControlBullets.getDirection = function (bullet) {
    var stateControlBullet = this.getStateControlBullet(bullet);

    if (stateControlBullet === undefined) {
      return null;
    }

    return stateControlBullet.currentDirection;
  };

  StateControlBullets.isDirectionDown = function (bullet) {
    var stateControlBullet = this.getStateControlBullet(bullet);

    if (stateControlBullet === undefined) {
      return null;
    }

    return stateControlBullet.currentDirection === Phaser.DOWN;
  };

  StateControlBullets.isDirectionLeft = function (bullet) {
    var stateControlBullet = this.getStateControlBullet(bullet);

    if (stateControlBullet === undefined) {
      return null;
    }

    return stateControlBullet.currentDirection === Phaser.LEFT;
  };

  StateControlBullets.isDirectionRight = function (bullet) {
    var stateControlBullet = this.getStateControlBullet(bullet);

    if (stateControlBullet === undefined) {
      return null;
    }

    return stateControlBullet.currentDirection === Phaser.RIGHT;
  };

  StateControlBullets.isDirectionUp = function (bullet) {
    var stateControlBullet = this.getStateControlBullet(bullet);

    if (stateControlBullet === undefined) {
      return null;
    }

    return stateControlBullet.currentDirection === Phaser.UP;
  };

  StateControlBullets.getStateControlBullet = function (bullet) {
    var name = bullet.getData("name");
    var key = bullet.getData("key");
    return this.stateControlBullets.filter(function (a) {
      return a.name === name && a.key === key;
    })[0];
  };

  return StateControlBullets;
}();

exports.StateControlBullets = StateControlBullets;

/***/ }),

/***/ 1094:
/*!**********************************************!*\
  !*** ./src/entities/state-control-bullet.ts ***!
  \**********************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var StateControlBullet =
/** @class */
function () {
  function StateControlBullet(name, key, direction) {
    this.name = name;
    this.key = key;
    this.currentDirection = direction;
  }

  return StateControlBullet;
}();

exports.StateControlBullet = StateControlBullet;

/***/ }),

/***/ 1095:
/*!*******************************************!*\
  !*** ./src/state-control/state-player.ts ***!
  \*******************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 // tslint:disable-next-line: no-reference
/// <reference path="../../types/phaser.d.ts" />

Object.defineProperty(exports, "__esModule", {
  value: true
});

var StateControlPlayer =
/** @class */
function () {
  function StateControlPlayer() {}

  StateControlPlayer.processMovement = function (player, cursors) {
    player.setVelocity(0, 0);

    if (cursors.up.isDown) {
      this.setNewDirection(Phaser.UP);
      player.anims.play("game-anim-player01-up", true);
      player.setVelocity(0, -this.PLAYER_SPEED);
    } else if (cursors.right.isDown) {
      this.setNewDirection(Phaser.RIGHT);
      player.anims.play("game-anim-player01-right", true);
      player.setVelocity(this.PLAYER_SPEED, 0);
    } else if (cursors.down.isDown) {
      this.setNewDirection(Phaser.DOWN);
      player.anims.play("game-anim-player01-down", true);
      player.setVelocity(0, this.PLAYER_SPEED);
    } else if (cursors.left.isDown) {
      this.setNewDirection(Phaser.LEFT);
      player.anims.play("game-anim-player01-left", true);
      player.setVelocity(-this.PLAYER_SPEED, 0);
    } // align to grid on direction change


    if (this.currentDirection !== this.previousDirection) {
      var newPosX = Phaser.Math.Snap.To(player.x, 24);
      var newPosY = Phaser.Math.Snap.To(player.y, 24);
      player.setPosition(newPosX, newPosY);
    }
  };

  StateControlPlayer.getDirection = function () {
    return this.currentDirection;
  };

  StateControlPlayer.isDirectionDown = function () {
    return this.currentDirection === Phaser.DOWN;
  };

  StateControlPlayer.isDirectionLeft = function () {
    return this.currentDirection === Phaser.LEFT;
  };

  StateControlPlayer.isDirectionRight = function () {
    return this.currentDirection === Phaser.RIGHT;
  };

  StateControlPlayer.isDirectionUp = function () {
    return this.currentDirection === Phaser.UP;
  };

  StateControlPlayer.setNewDirection = function (direction) {
    this.previousDirection = this.currentDirection;
    this.currentDirection = direction;
  };

  StateControlPlayer.PLAYER_SPEED = 160;
  return StateControlPlayer;
}();

exports.StateControlPlayer = StateControlPlayer;

/***/ }),

/***/ 1096:
/*!*****************************************!*\
  !*** ./src/scenes/stagenumber-scene.ts ***!
  \*****************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 // tslint:disable-next-line: no-reference
/// <reference path="../../types/phaser.d.ts" />

var __extends = this && this.__extends || function () {
  var extendStatics = Object.setPrototypeOf || {
    __proto__: []
  } instanceof Array && function (d, b) {
    d.__proto__ = b;
  } || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
  };

  return function (d, b) {
    extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var StageNumberScene =
/** @class */
function (_super) {
  __extends(StageNumberScene, _super);

  function StageNumberScene() {
    return _super.call(this, {
      key: "StageNumberScene"
    }) || this;
  }

  StageNumberScene.prototype.init = function (params) {
    this.gameProgress = params;
  };

  StageNumberScene.prototype.preload = function () {
    this.load.image("load-background", "assets/images/backgrounds/load-background.png");
  };

  StageNumberScene.prototype.create = function () {
    var _this = this;

    this.background = this.add.image(0, 0, "load-background").setOrigin(0, 0);
    this.textStageNumber = this.add.bitmapText(292, 340, "console-font", "STAGE  " + this.gameProgress.stageNumber, 24);
    this.textStageNumber.setTint(0x111111);
    this.cameras.main.setScroll(0, -720);
    this.cameras.main.pan(384, 360, 500, "Linear", false);
    this.time.delayedCall(2000, function () {
      _this.scene.start("StageScene", _this.gameProgress);
    });
  };

  StageNumberScene.prototype.update = function (time) {// .
  };

  return StageNumberScene;
}(Phaser.Scene);

exports.StageNumberScene = StageNumberScene;

/***/ }),

/***/ 1097:
/*!*************************************!*\
  !*** ./src/scenes/welcome-scene.ts ***!
  \*************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __extends = this && this.__extends || function () {
  var extendStatics = Object.setPrototypeOf || {
    __proto__: []
  } instanceof Array && function (d, b) {
    d.__proto__ = b;
  } || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
  };

  return function (d, b) {
    extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var game_progress_1 = __webpack_require__(/*! ../entities/game-progress */ 1098);

var WelcomeScene =
/** @class */
function (_super) {
  __extends(WelcomeScene, _super);

  function WelcomeScene() {
    var _this = _super.call(this, {
      key: "WelcomeScene"
    }) || this;

    _this.gameProgress = new game_progress_1.GameProgress();
    return _this;
  }

  WelcomeScene.prototype.init = function (params) {
    this.blink = false;
    this.gameProgress.resetGameProgress();
  };

  WelcomeScene.prototype.preload = function () {
    this.load.image("welcome-background", "assets/images/backgrounds/welcome-background.png");
    this.load.bitmapFont("console-font", "assets/fonts/press-start-2p.png", "assets/fonts/press-start-2p.fnt");
  };

  WelcomeScene.prototype.create = function () {
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
      loop: true
    });
  };

  WelcomeScene.prototype.update = function (time) {
    if (this.cursors.space.isDown) {
      this.cursors.space.reset();
      this.gameProgress.nextStage(); // carga de la siguiente escena

      this.scene.start("StageNumberScene", this.gameProgress);
    }
  };

  WelcomeScene.prototype.blinkBackground = function () {
    this.textStart.setVisible(this.blink);
    this.blink = !this.blink;
  };

  return WelcomeScene;
}(Phaser.Scene);

exports.WelcomeScene = WelcomeScene;

/***/ }),

/***/ 1098:
/*!***************************************!*\
  !*** ./src/entities/game-progress.ts ***!
  \***************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var utils_1 = __webpack_require__(/*! ../utilities/utils */ 1099);

var GameProgress =
/** @class */
function () {
  function GameProgress() {
    this.POINTS_REGULAR_ENEMY = 100;
    this.POINTS_SPEEDY_ENEMY = 200;
    this.POINTS_SHOOTER_ENEMY = 300;
    this.POINTS_HEAVY_ENEMY = 400;
    this.MAX_STAGE = 3;
  }

  GameProgress.prototype.resetGameProgress = function () {
    this.resetPlayerOne();
    this.resetPlayerTwo();
    this.resetStageProgress();
    this.resetStageStats();
  };

  GameProgress.prototype.resetPlayerOne = function () {
    this.playerOneLives = 2;
    this.playerOneTotalPoints = 0;
  };

  GameProgress.prototype.resetPlayerTwo = function () {
    this.playerTwoLives = 2;
    this.playerOneTotalPoints = 0;
  };

  GameProgress.prototype.resetStageProgress = function () {
    this.stageNumber = 0;
  };

  GameProgress.prototype.resetStageStats = function () {
    this.playerOneRegularsCount = 0;
    this.playerOneRegularsPoints = 0;
    this.playerOneSpeediesCount = 0;
    this.playerOneSpeediesPoints = 0;
    this.playerOneShootersCount = 0;
    this.playerOneShootersPoints = 0;
    this.playerOneHeaviesCount = 0;
    this.playerOneHeaviesPoints = 0;
    this.playerOneStageCount = 0;
    this.playerOneStagePoints = 0;
    this.playerTwoRegularsCount = 0;
    this.playerTwoRegularsPoints = 0;
    this.playerTwoSpeediesCount = 0;
    this.playerTwoSpeediesPoints = 0;
    this.playerTwoShootersCount = 0;
    this.playerTwoShootersPoints = 0;
    this.playerTwoHeaviesCount = 0;
    this.playerTwoHeaviesPoints = 0;
    this.playerTwoStageCount = 0;
    this.playerTwoStagePoints = 0;
  };

  GameProgress.prototype.getStageName = function () {
    return utils_1.Utils.buildStageName(this.stageNumber);
  };

  GameProgress.prototype.nextStage = function () {
    this.stageNumber += 1;
  };

  GameProgress.prototype.calculateStageStats = function () {
    this.playerOneRegularsPoints = this.playerOneRegularsCount * this.POINTS_REGULAR_ENEMY;
    this.playerOneSpeediesPoints = this.playerOneSpeediesCount * this.POINTS_SPEEDY_ENEMY;
    this.playerOneShootersPoints = this.playerOneShootersCount * this.POINTS_SHOOTER_ENEMY;
    this.playerOneHeaviesPoints = this.playerOneHeaviesCount * this.POINTS_HEAVY_ENEMY;
    this.playerOneStageCount = this.playerOneRegularsCount + this.playerOneSpeediesCount + this.playerOneShootersCount + this.playerOneHeaviesCount;
    this.playerOneStagePoints = this.playerOneRegularsPoints + this.playerOneSpeediesPoints + this.playerOneShootersPoints + this.playerOneHeaviesPoints;
    this.playerOneTotalPoints += this.playerOneStagePoints;
    this.playerTwoRegularsPoints = this.playerTwoRegularsCount * this.POINTS_REGULAR_ENEMY;
    this.playerTwoSpeediesPoints = this.playerTwoSpeediesCount * this.POINTS_SPEEDY_ENEMY;
    this.playerTwoShootersPoints = this.playerTwoShootersCount * this.POINTS_SHOOTER_ENEMY;
    this.playerTwoHeaviesPoints = this.playerTwoHeaviesCount * this.POINTS_HEAVY_ENEMY;
    this.playerTwoStageCount = this.playerTwoRegularsCount + this.playerTwoSpeediesCount + this.playerTwoShootersCount + this.playerTwoHeaviesCount;
    this.playerTwoStagePoints = this.playerTwoRegularsPoints + this.playerTwoSpeediesPoints + this.playerTwoShootersPoints + this.playerTwoHeaviesPoints;
    this.playerTwoTotalPoints += this.playerTwoStagePoints;
  };

  return GameProgress;
}();

exports.GameProgress = GameProgress;

/***/ }),

/***/ 1099:
/*!********************************!*\
  !*** ./src/utilities/utils.ts ***!
  \********************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var Utils =
/** @class */
function () {
  function Utils() {}

  Utils.buildStageName = function (stageNumber) {
    return stageNumber < 10 ? "0" + stageNumber.toString() : stageNumber.toString();
  };

  return Utils;
}();

exports.Utils = Utils;

/***/ }),

/***/ 434:
/*!********************************************!*\
  !*** ./src/state-control/state-enemies.ts ***!
  \********************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 // tslint:disable-next-line: no-reference
/// <reference path="../../types/phaser.d.ts" />

Object.defineProperty(exports, "__esModule", {
  value: true
});

var state_control_enemy_1 = __webpack_require__(/*! ../entities/state-control-enemy */ 1091);

var StateControlEnemies =
/** @class */
function () {
  function StateControlEnemies() {}

  StateControlEnemies.register = function (key) {
    if (this.stateControlEnemies === undefined) {
      this.stateControlEnemies = new Array(0);
    }

    var enemy = new state_control_enemy_1.StateControlEnemy(key);
    this.stateControlEnemies.push(enemy);
  };

  StateControlEnemies.processMovement = function (enemy, enemyMovement) {
    var stop = enemy.getData("stop");
    var type = enemy.getData("type");

    if (stop) {
      return;
    }

    var stateControlEnemy = this.getStateControlEnemy(enemy);

    if (stateControlEnemy === undefined) {
      return null;
    }

    enemy.setVelocity(0, 0);
    stateControlEnemy.setNewDirection(enemyMovement);

    if (enemyMovement === Phaser.UP) {
      enemy.setVelocity(0, -this.ENEMIES_SPEED);
      enemy.anims.play("game-anim-" + type + "-enemy-up", true);
    } else if (enemyMovement === Phaser.RIGHT) {
      enemy.setVelocity(this.ENEMIES_SPEED, 0);
      enemy.anims.play("game-anim-" + type + "-enemy-right", true);
    } else if (enemyMovement === Phaser.DOWN) {
      enemy.setVelocity(0, this.ENEMIES_SPEED);
      enemy.anims.play("game-anim-" + type + "-enemy-down", true);
    } else if (enemyMovement === Phaser.LEFT) {
      enemy.setVelocity(-this.ENEMIES_SPEED, 0);
      enemy.anims.play("game-anim-" + type + "-enemy-left", true);
    } // align to grid on direction change


    if (stateControlEnemy.currentDirection !== stateControlEnemy.previousDirection) {
      var newPosX = Phaser.Math.Snap.To(enemy.x, 24);
      var newPosY = Phaser.Math.Snap.To(enemy.y, 24);
      enemy.setPosition(newPosX, newPosY);
    }
  };

  StateControlEnemies.getDirection = function (enemy) {
    var stateControlEnemy = this.getStateControlEnemy(enemy);

    if (stateControlEnemy === undefined) {
      return null;
    }

    return stateControlEnemy.currentDirection;
  };

  StateControlEnemies.isDirectionDown = function (enemy) {
    var stateControlEnemy = this.getStateControlEnemy(enemy);

    if (stateControlEnemy === undefined) {
      return null;
    }

    return stateControlEnemy.currentDirection === Phaser.DOWN;
  };

  StateControlEnemies.isDirectionLeft = function (enemy) {
    var stateControlEnemy = this.getStateControlEnemy(enemy);

    if (stateControlEnemy === undefined) {
      return null;
    }

    return stateControlEnemy.currentDirection === Phaser.LEFT;
  };

  StateControlEnemies.isDirectionRight = function (enemy) {
    var stateControlEnemy = this.getStateControlEnemy(enemy);

    if (stateControlEnemy === undefined) {
      return null;
    }

    return stateControlEnemy.currentDirection === Phaser.RIGHT;
  };

  StateControlEnemies.isDirectionUp = function (enemy) {
    var stateControlEnemy = this.getStateControlEnemy(enemy);

    if (stateControlEnemy === undefined) {
      return null;
    }

    return stateControlEnemy.currentDirection === Phaser.UP;
  };

  StateControlEnemies.getStateControlEnemy = function (enemy) {
    var key = enemy.getData("name");
    return this.stateControlEnemies.filter(function (a) {
      return a.key === key;
    })[0];
  };

  StateControlEnemies.ENEMIES_SPEED = 80;
  return StateControlEnemies;
}();

exports.StateControlEnemies = StateControlEnemies;

/***/ }),

/***/ 435:
/*!****************************************!*\
  !*** ./src/scripting/state-machine.ts ***!
  \****************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var state_machine_enemy_1 = __webpack_require__(/*! ../entities/state-machine-enemy */ 1092);

var StateMachine =
/** @class */
function () {
  function StateMachine() {}

  StateMachine.register = function (key) {
    if (this.stateMachineEnemies === undefined) {
      this.stateMachineEnemies = new Array(0);
    }

    var enemy = new state_machine_enemy_1.StateMachineEnemy(key);
    enemy.movementCounter = 0;
    enemy.movementThreshold = this.nextFpsThreshold(this.MOV_THRESHOLD_MIN, this.MOV_THRESHOLD_MAX);
    enemy.movementValue = Phaser.DOWN; // this.nextMovementValue();

    enemy.shootingCounter = 0;
    enemy.shootingThreshold = this.nextFpsThreshold(this.SHOOT_THRESHOLD_MIN, this.SHOOT_THRESHOLD_MAX);
    this.stateMachineEnemies.push(enemy);
  };

  StateMachine.getMovement = function (key) {
    var stateMachineEnemy = this.stateMachineEnemies.filter(function (a) {
      return a.key === key;
    })[0];

    if (stateMachineEnemy === undefined) {
      return null;
    }

    stateMachineEnemy.movementCounter += 1;

    if (stateMachineEnemy.movementCounter === stateMachineEnemy.movementThreshold) {
      stateMachineEnemy.movementCounter = 0;
      stateMachineEnemy.movementThreshold = this.nextFpsThreshold(this.MOV_THRESHOLD_MIN, this.MOV_THRESHOLD_MAX);
      stateMachineEnemy.movementValue = this.nextMovementValue();
    }

    return stateMachineEnemy.movementValue;
  };

  StateMachine.getShooting = function (key) {
    var stateMachineEnemy = this.stateMachineEnemies.filter(function (a) {
      return a.key === key;
    })[0];

    if (stateMachineEnemy === undefined) {
      return null;
    }

    stateMachineEnemy.shootingCounter += 1;

    if (stateMachineEnemy.shootingCounter === stateMachineEnemy.shootingThreshold) {
      stateMachineEnemy.shootingCounter = 0;
      stateMachineEnemy.shootingThreshold = this.nextFpsThreshold(this.SHOOT_THRESHOLD_MIN, this.SHOOT_THRESHOLD_MAX);
      return true;
    }

    return false;
  };

  StateMachine.nextMovementValue = function () {
    return Phaser.Math.RND.integerInRange(5, 8);
  };

  StateMachine.nextFpsThreshold = function (thresholdMin, thresholdMax) {
    return Phaser.Math.RND.integerInRange(thresholdMin, thresholdMax);
  };

  StateMachine.MOV_THRESHOLD_MAX = 4 * 60; // 60 fps

  StateMachine.MOV_THRESHOLD_MIN = 0;
  StateMachine.SHOOT_THRESHOLD_MAX = 4 * 60; // 60 fps

  StateMachine.SHOOT_THRESHOLD_MIN = 0;
  return StateMachine;
}();

exports.StateMachine = StateMachine;

/***/ }),

/***/ 436:
/*!**************************!*\
  !*** multi ./src/app.ts ***!
  \**************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\Projects\mini-battle-city\src\app.ts */437);


/***/ }),

/***/ 437:
/*!********************!*\
  !*** ./src/app.ts ***!
  \********************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __extends = this && this.__extends || function () {
  var extendStatics = Object.setPrototypeOf || {
    __proto__: []
  } instanceof Array && function (d, b) {
    d.__proto__ = b;
  } || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
  };

  return function (d, b) {
    extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

Object.defineProperty(exports, "__esModule", {
  value: true
});

__webpack_require__(/*! phaser */ 210);

var gameover_scene_1 = __webpack_require__(/*! ./scenes/gameover-scene */ 1078);

var scores_scene_1 = __webpack_require__(/*! ./scenes/scores-scene */ 1079);

var stage_scene_1 = __webpack_require__(/*! ./scenes/stage-scene */ 1080);

var stagenumber_scene_1 = __webpack_require__(/*! ./scenes/stagenumber-scene */ 1096);

var welcome_scene_1 = __webpack_require__(/*! ./scenes/welcome-scene */ 1097);

var defaultConfig = {
  backgroundColor: "000000",
  height: 720,
  parent: "game",
  physics: {
    arcade: {
      debug: false,
      gravity: {
        x: 0,
        y: 0
      }
    },
    default: "arcade"
  },
  render: {
    pixelArt: true,
    antialias: false
  },
  scene: [welcome_scene_1.WelcomeScene, gameover_scene_1.GameOverScene, scores_scene_1.ScoresScene, stage_scene_1.StageScene, stagenumber_scene_1.StageNumberScene],
  title: "Mini Battle City",
  type: Phaser.AUTO,
  width: 768
};

var BattleCityGame =
/** @class */
function (_super) {
  __extends(BattleCityGame, _super);

  function BattleCityGame(config) {
    return _super.call(this, config) || this;
  }

  return BattleCityGame;
}(Phaser.Game);

exports.BattleCityGame = BattleCityGame;

window.onload = function () {
  var game = new BattleCityGame(defaultConfig);
};
/* window.onload = () => {
  window.focus();
  const game = new BattleCityGame(config);
  resizeGame();
  window.addEventListener("resize", resizeGame);
}; */

/* function resizeGame() {
  const canvas: (HTMLCanvasElement | null) = document.querySelector("canvas");
  if (canvas !== null) {
      const windowWidth: number = window.innerWidth;
      const windowHeight: number = window.innerHeight;
      const windowRatio: number = windowWidth / windowHeight;
      const gameRatio: number = 750 / 1334;
      if (windowRatio < gameRatio) {
          canvas.style.width = windowWidth + "px";
          canvas.style.height = (windowWidth / gameRatio) + "px";
      } else {
          canvas.style.width = (windowHeight * gameRatio) + "px";
          canvas.style.height = windowHeight + "px";
      }
  }
} */

/***/ })

},[436]);
//# sourceMappingURL=bundle.js.map