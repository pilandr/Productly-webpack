import Slider from "@/scripts/slider";
import Burger from "@/scripts/burger";

Slider.init();
Burger.init();

window.addEventListener("resize", function () {
  Slider.init();
});
