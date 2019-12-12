// tslint:disable-next-line: no-reference
/// <reference path="../../types/phaser.d.ts" />

export class StateMachine {

  public static register(key: string): void {

    // ToDo: continuar aca !!!
    // this.enemies.

  }

  public static getMovement(key: string): number {

    this.movementCounter += 1;
    if (this.movementCounter === this.movementThreshold) {
      this.movementCounter = 0;
      this.movementThreshold = Phaser.Math.RND.integerInRange(0, 5000) * 60;
      this.movementValue = Phaser.Math.RND.integerInRange(5, 8);
    }

    return this.movementValue;
  }

  public static getShooting(key: string): boolean {

    this.shootingCounter += 1;
    if (this.shootingCounter === this.shootingThreshold) {
      this.shootingCounter = 0;
      this.shootingThreshold = Phaser.Math.RND.integerInRange(0, 5000) * 60;
      return true;
    }

    return false;
  }

  // ToDo: Mofificar para manejar los 20 enemigos independientes en simultáneo !!!
  private static enemies: any;

  private static movementCounter: number;
  private static movementThreshold: number;
  private static movementValue: number;

  private static shootingCounter: number;
  private static shootingThreshold: number;
}
