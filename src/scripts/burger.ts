const Burger = (function () {

  function init() {
    console.log("test burger");
    const burger = document.querySelector(".burger");
    if (!burger) return;
    burger.addEventListener("click", function () {
      this.classList.toggle("burger_active");
    });
  }
  
  return {
    init,
  };

})();

export default Burger;
