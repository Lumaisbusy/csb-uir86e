/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Ball extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("ball-e", "./Ball/costumes/ball-e.svg", { x: 22, y: 22 })
    ];

    this.sounds = [
      new Sound("Boing", "./Ball/sounds/Boing.wav"),
      new Sound("Pop", "./Ball/sounds/Pop.wav")
    ];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked2)
    ];
  }

  *whenGreenFlagClicked() {
    this.y = 110;
    this.stage.vars.y = 0;
    while (true) {
      if (
        !(
          this.touching(Color.rgb(143, 207, 85)) ||
          this.touching(Color.rgb(191, 77, 223))
        )
      ) {
        this.stage.vars.y--;
      }
      if (this.touching(Color.rgb(143, 207, 85))) {
        this.stage.vars.y = 1;
        this.y += this.toNumber(this.stage.vars.y);
        this.stage.vars.y = 0;
      }
      if (this.keyPressed("space")) {
        this.stage.vars.y += 1.5;
      }
      yield;
    }
  }

  *whenGreenFlagClicked2() {
    while (true) {
      this.y += this.toNumber(this.stage.vars.y);
      yield;
    }
  }
}
