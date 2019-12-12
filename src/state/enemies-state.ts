// tslint:disable-next-line: no-reference
/// <reference path="../../types/phaser.d.ts" />

export class EnemiesState {

  public static currentDirection: number;
  public static previousDirection: number;

  public static processMovement(enemy: Phaser.Physics.Arcade.Sprite, enemyMovement: number): void {

    enemy.setVelocity(0, 0);

    if (enemyMovement === Phaser.UP) {
      this.previousDirection = this.currentDirection;
      this.currentDirection = Phaser.UP;
      // enemy.anims.play("game-anim-regular-enemy-up", true);
      // enemy.anims.play("game-anim-speedy-enemy-up", true);
      // enemy.anims.play("game-anim-shooter-enemy-up", true);
      // enemy.anims.play("game-anim-heavy-enemy-up", true);
      enemy.setVelocity(0, -160);

    } else if (enemyMovement === Phaser.RIGHT) {
      this.previousDirection = this.currentDirection;
      this.currentDirection = Phaser.RIGHT;
      // enemy.anims.play("game-anim-regular-enemy-right", true);
      enemy.setVelocity(160, 0);

    } else if (enemyMovement === Phaser.DOWN) {
      this.previousDirection = this.currentDirection;
      this.currentDirection = Phaser.DOWN;
      // enemy.anims.play("game-anim-regular-enemy-down", true);
      enemy.setVelocity(0, 160);

    } else if (enemyMovement === Phaser.LEFT) {
      this.previousDirection = this.currentDirection;
      this.currentDirection = Phaser.LEFT;
      // enemy.anims.play("game-anim-regular-enemy-left", true);
      enemy.setVelocity(-160, 0);
    }

    // align to grid on direction change
    if (this.currentDirection !== this.previousDirection) {
      const newPosX = Phaser.Math.Snap.To(enemy.x, 24);
      const newPosY = Phaser.Math.Snap.To(enemy.y, 24);
      enemy.setPosition(newPosX, newPosY);
    }
  }

  public static isDirectionDown(): boolean {
    return (this.currentDirection === Phaser.DOWN);
  }

  public static isDirectionLeft(): boolean {
    return (this.currentDirection === Phaser.LEFT);
  }

  public static isDirectionRight(): boolean {
    return (this.currentDirection === Phaser.RIGHT);
  }

  public static isDirectionUp(): boolean {
    return (this.currentDirection === Phaser.UP);
  }
}
