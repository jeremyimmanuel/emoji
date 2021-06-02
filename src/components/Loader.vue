<template>
  <div class="text-4xl my-loader"><slot /></div>
</template>

<script>
import Bounce from "bounce.js";

export default {
  name: "Loader",

  beforeCreate() {
    let slinky = new Bounce();
    for (let i = 0; i < 6; i++) {
      let xFrom = 0;
      let xTo = 100;
      if (i === 0) {
        xFrom = -260;
        xTo = -160;
      }
      slinky.translate({
        from: { x: xFrom },
        to: { x: xTo },
        delay: i * 500,
        easing: "bounce",
      });
    }
    for (let i = 0; i < 6; i++) {
      slinky.translate({
        from: { y: 0 },
        to: { y: -100 },
        delay: i * 500,
        easing: "sway",
      });
    }
    for (let i = 0; i < 6; i++) {
      slinky.rotate({
        from: 0,
        to: 90,
        delay: i * 500,
        easing: "bounce",
      });
    }

    slinky.define("slinky");
  },
};
</script>

<style lang="scss" scoped>
.my-loader {
  animation: slinky 2.5s linear infinite;
}
</style>