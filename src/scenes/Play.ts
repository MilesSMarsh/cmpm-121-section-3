import * as Phaser from "phaser";

import starfieldUrl from "/assets/starfield.png";

export default class Play extends Phaser.Scene {

  moveSpeed = 1;
  isFiring = false;

  fire?: Phaser.Input.Keyboard.Key;
  left?: Phaser.Input.Keyboard.Key;
  right?: Phaser.Input.Keyboard.Key;

  starfield?: Phaser.GameObjects.TileSprite;
  rocket?: Phaser.GameObjects.Sprite;

  rotationSpeed = Phaser.Math.PI2 / 1000; // radians per millisecond

  constructor() {
    super("play");
  }

  preload() {
    this.load.image("starfield", starfieldUrl);
    this.load.image("rocket", "./assets/Rocket.png");
  }

  #addKey(
    name: keyof typeof Phaser.Input.Keyboard.KeyCodes,
  ): Phaser.Input.Keyboard.Key {
    return this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes[name]);
  }

  create() {
    this.fire = this.#addKey("F");
    this.left = this.#addKey("LEFT");
    this.right = this.#addKey("RIGHT");

    this.starfield = this.add
      .tileSprite(
        0,
        0,
        this.game.config.width as number,
        this.game.config.height as number,
        "starfield",
      )
      .setOrigin(0, 0);

    this.rocket = this.add.sprite(320, 400, "rocket").setScale(4);

  }

  update(_timeMs: number, delta: number) {
    this.starfield!.tilePositionX -= 4;

    if (this.left!.isDown) {
      this.rocket!.x -= delta * this.moveSpeed;
    }
    if (this.right!.isDown) {
      this.rocket!.x += delta * this.moveSpeed;
    }

    if (this.fire!.isDown && this.isFiring!) {
      this.isFiring = true;

    }

    if(this.isFiring){
      this.rocket!.y += this.moveSpeed * delta;
      if(this.rocket!.y < 0){
        this.isFiring = false;
        this.rocket!.y = 400;
      }
    }
  }
}
