import Slider from "./slider.js";
import Burger from "./burger";

Slider.init();
Burger.init();

window.addEventListener("resize", function () {
  Slider.init();
});
