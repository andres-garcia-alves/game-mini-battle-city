export class ScriptManager {

  public static parse(scene: Phaser.Scene, group: Phaser.Physics.Arcade.Group, data: string): void {

    const JSON_KEY_ENEMIES: string = "enemies";
    const JSON_KEY_TYPE: string = "type";
    const JSON_KEY_SPAWN: string = "spawn";
    const JSON_KEY_DELAY: string = "delay";
    const SPAWN_Y = 72;

    let posX: number = 0;
    let posY: number = 0;
    let spriteKey: string = "";

    const enemies = data[JSON_KEY_ENEMIES];

    enemies.forEach((element: any) => {
      scene.time.delayedCall(element[JSON_KEY_DELAY], () => {

        posX = this.getPosX(element[JSON_KEY_SPAWN]);
        posY = SPAWN_Y;
        spriteKey = this.getSpriteKey(element[JSON_KEY_TYPE]);

        const enemy = group.create(posX, posY, spriteKey);
        enemy.setBounce(0, 0);
        enemy.setCollideWorldBounds(true);
        enemy.setImmovable(true);
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

    const SPRITE_KEY_REGULAR: string = "game-enemy-regular";
    const SPRITE_KEY_SPEEDY: string = "game-enemy-speedy";
    const SPRITE_KEY_SHOOTER: string = "game-enemy-shooter";
    const SPRITE_KEY_HEAVY: string = "game-enemy-heavy";

    type = type.toLowerCase();
    if (type === "regular") { return SPRITE_KEY_REGULAR; }
    if (type === "speedy")  { return SPRITE_KEY_SPEEDY; }
    if (type === "shooter")   { return SPRITE_KEY_SHOOTER; }
    if (type === "heavy")   { return SPRITE_KEY_HEAVY; }
  }
}
