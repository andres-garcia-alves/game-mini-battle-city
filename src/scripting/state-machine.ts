import { StateMachineEnemy } from "../entities/state-machine-enemy";

export class StateMachine {

  public static stateMachineEnemies: any[];

  public static MOV_THRESHOLD_MAX = 5;
  public static MOV_THRESHOLD_MIN = 0;
  public static SHOOT_THRESHOLD_MAX = 3;
  public static SHOOT_THRESHOLD_MIN = 0;

  public static register(key: string): void {

    if (this.stateMachineEnemies === undefined) { this.stateMachineEnemies = new Array(0); }

    const newEnemy = new StateMachineEnemy(key);
    newEnemy.key = key;
    newEnemy.movementCounter = 0;
    newEnemy.movementThreshold = this.nextFpsThreshold(this.MOV_THRESHOLD_MIN, this.MOV_THRESHOLD_MAX);
    newEnemy.movementValue = Phaser.DOWN; // this.nextMovementValue();
    newEnemy.shootingCounter = 0;
    newEnemy.shootingThreshold = this.nextFpsThreshold(this.SHOOT_THRESHOLD_MIN, this.SHOOT_THRESHOLD_MAX);

    this.stateMachineEnemies.push(newEnemy);
  }

  public static getMovement(key: string): number {

    const stateMachineEnemy = this.stateMachineEnemies.filter((a) => a.key === key)[0];
    if (stateMachineEnemy === undefined) { return null; }

    stateMachineEnemy.movementCounter += 1;
    if (stateMachineEnemy.movementCounter === stateMachineEnemy.movementThreshold) {
      stateMachineEnemy.movementCounter = 0;
      stateMachineEnemy.movementThreshold = this.nextFpsThreshold(this.MOV_THRESHOLD_MIN, this.MOV_THRESHOLD_MAX);
      stateMachineEnemy.movementValue = this.nextMovementValue();
    }

    return stateMachineEnemy.movementValue;
  }

  public static getShooting(key: string): boolean {

    const stateMachineEnemy = this.stateMachineEnemies.filter((a) => a.key === key)[0];
    if (stateMachineEnemy === undefined) { return null; }

    stateMachineEnemy.shootingCounter += 1;
    if (stateMachineEnemy.shootingCounter === stateMachineEnemy.shootingThreshold) {
      stateMachineEnemy.shootingCounter = 0;
      stateMachineEnemy.shootingThreshold = this.nextFpsThreshold(this.SHOOT_THRESHOLD_MIN, this.SHOOT_THRESHOLD_MAX);
      return true;
    }

    return false;
  }

  private static nextMovementValue(): number {
    return Phaser.Math.RND.integerInRange(5, 8);
  }

  private static nextFpsThreshold(thresholdMin: number, thresholdMax: number): number {
    return Phaser.Math.RND.integerInRange(thresholdMin, thresholdMax) * 60; // 60 fps
  }
}
