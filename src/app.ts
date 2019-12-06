import "phaser";
import { LoadScene } from "./scenes/load-scene";
import { StageScene } from "./scenes/stage-scene";
import { WelcomeScene } from "./scenes/welcome-scene";

const defaultConfig: Phaser.Types.Core.GameConfig = {
  backgroundColor: "000000",
  height: 720,
  parent: "game",
  physics: {
    arcade: {
      gravity: { x: 0, y: 0 },
    },
    default: "arcade",
  },
  render: { pixelArt: true, antialias: false },
  scene: [WelcomeScene, LoadScene, StageScene],
  title: "Mini Battle City",
  type: Phaser.AUTO,
  width: 768,
};

export class BattleCityGame extends Phaser.Game {

  constructor(config: Phaser.Types.Core.GameConfig) {
    super(config);
  }

}

window.onload = () => {
  const game = new BattleCityGame(defaultConfig);
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
