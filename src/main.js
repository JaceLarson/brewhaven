/*
 * Phaser bootstrap. pixelArt:true keeps our code-drawn textures crisp when
 * scaled up; Scale.FIT letterboxes the 800x600 game to fill the window.
 */
const config = {
  type: Phaser.AUTO,
  parent: 'game',
  width: 800,
  height: 600,
  pixelArt: true,
  roundPixels: true,
  backgroundColor: '#1b1620',
  scene: [BootScene, GameScene],
  scale: {
    mode: Phaser.Scale.FIT,
  },
};

// eslint-disable-next-line no-new
new Phaser.Game(config);
