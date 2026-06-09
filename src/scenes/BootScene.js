/*
 * BootScene
 * Generates every texture in code (see pixelArt.js), then hands off to the game.
 * Because all art is procedural there are no asset files to load.
 */
class BootScene extends Phaser.Scene {
  constructor() {
    super('BootScene');
  }

  create() {
    buildAllTextures(this);
    this.scene.start('MenuScene');
  }
}
