// tslint:disable-next-line: no-reference
/// <reference path="../../types/phaser.d.ts" />

export class PlayerState {

  public static DIRECTION_DOWN = "down";
  public static DIRECTION_LEFT = "left";
  public static DIRECTION_RIGHT = "right";
  public static DIRECTION_UP = "up";

  public static playerCurrentDirection: string;
  public static playerPreviousDirection: string;

  public static alignPosition(player: Phaser.Physics.Arcade.Sprite): void {
    const newPosX = Phaser.Math.Snap.To(player.x, 24);
    const newPosY = Phaser.Math.Snap.To(player.y, 24);

    player.setPosition(newPosX, newPosY);
  }

  public static isDirectionDown(): boolean {
    return (this.playerCurrentDirection === this.DIRECTION_DOWN);
  }

  public static isDirectionLeft(): boolean {
    return (this.playerCurrentDirection === this.DIRECTION_LEFT);
  }

  public static isDirectionRight(): boolean {
    return (this.playerCurrentDirection === this.DIRECTION_RIGHT);
  }

  public static isDirectionUp(): boolean {
    return (this.playerCurrentDirection === this.DIRECTION_UP);
  }

  public static processMovement(player: Phaser.Physics.Arcade.Sprite, cursors: Phaser.Types.Input.Keyboard.CursorKeys): void {

    player.setVelocity(0, 0);

    if (cursors.up.isDown) {
      this.playerPreviousDirection = this.playerCurrentDirection;
      this.playerCurrentDirection = this.DIRECTION_UP;
      player.anims.play("game-anim-player01-up", true);
      player.setVelocity(0, -160);

    } else if (cursors.right.isDown) {
      this.playerPreviousDirection = this.playerCurrentDirection;
      this.playerCurrentDirection = this.DIRECTION_RIGHT;
      player.anims.play("game-anim-player01-right", true);
      player.setVelocity(160, 0);

    } else if (cursors.down.isDown) {
      this.playerPreviousDirection = this.playerCurrentDirection;
      this.playerCurrentDirection = this.DIRECTION_DOWN;
      player.anims.play("game-anim-player01-down", true);
      player.setVelocity(0, 160);

    } else if (cursors.left.isDown) {
      this.playerPreviousDirection = this.playerCurrentDirection;
      this.playerCurrentDirection = this.DIRECTION_LEFT;
      player.anims.play("game-anim-player01-left", true);
      player.setVelocity(-160, 0);
    }

    // direction change
    if (this.playerCurrentDirection !== this.playerPreviousDirection) {
      this.alignPosition(player);
    }
  }

}
