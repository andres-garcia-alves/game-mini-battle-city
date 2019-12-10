export class ScriptManager {

  public static parse(scene: Phaser.Scene, group: Phaser.Physics.Arcade.Group, data: string, callback?: (args: any) => void, callbackContext?: any) {

    const JSON_KEY_ENEMIES: string = "enemies";
    const JSON_KEY_TYPE: string = "type";
    const JSON_KEY_SPAWN: string = "spawn";
    const JSON_KEY_DELAY: string = "delay";
    const SPAWN_Y = 72;

    let count: number = 0;
    let posX: number = 0;
    let posY: number = 0;
    let spriteKey: string = "";

    const enemies = data[JSON_KEY_ENEMIES];

    enemies.forEach((element: any) => {
      scene.time.delayedCall(element[JSON_KEY_DELAY], () => {

        count++;
        posX = this.getPosX(element[JSON_KEY_SPAWN]);
        posY = SPAWN_Y;
        spriteKey = this.getSpriteKey(element[JSON_KEY_TYPE]);

        const enemy = group.create(posX, posY, spriteKey);
        enemy.setBounce(0, 0);
        enemy.setCollideWorldBounds(true);
        enemy.setImmovable(true);
        enemy.setData("name", "enemy-" + count);

        if (callback !== undefined) { callback(callbackContext); }
      });
    });
  }

  private static getPosX(pos: string): number {

    const SPAWN_X_LEFT = 72;
    const SPAWN_X_CENTER = 360;
    const SPAWN_X_RIGHT = 648;

    pos = pos.toLowerCase();
    if (pos === "left")   { return SPAWN_X_LEFT; }
    if (pos === "center") { return SPAWN_X_CENTER; }
    if (pos === "right")  { return SPAWN_X_RIGHT; }
  }

  private static getSpriteKey(type: string): string {

    const SPRITE_KEY_REGULAR: string = "game-regular-enemy";
    const SPRITE_KEY_SPEEDY: string = "game-speedy-enemy";
    const SPRITE_KEY_SHOOTER: string = "game-shooter-enemy";
    const SPRITE_KEY_HEAVY: string = "game-heavy-enemy";

    type = type.toLowerCase();
    if (type === "regular") { return SPRITE_KEY_REGULAR; }
    if (type === "speedy")  { return SPRITE_KEY_SPEEDY; }
    if (type === "shooter") { return SPRITE_KEY_SHOOTER; }
    if (type === "heavy")   { return SPRITE_KEY_HEAVY; }
  }
}
