import Bounce from "bounce.js";

let scale15 = new Bounce();
scale15.scale({
    from: { x: 1, y: 1 },
    to: { x: 1.5, y: 1.5 },
});
scale15.define("scale15");

let roadRunner = new Bounce();
roadRunner.translate({
    from: { x: -500, y: 0 },
    to: { x: 0, y: 0 },
    duration: 2000,
});
roadRunner.define("road-runner");

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
