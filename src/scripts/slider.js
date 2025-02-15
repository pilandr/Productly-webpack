const Slider = (function () {

  const START_POSITION = "0px";
  const PHONES_WIDTH = "695";
  const TABLETS_WIDTH = "925";

  let options = {
    elementsVisible: 3,
    arrows: true,
    dots: true,
    currentSlide: 0,
    speed: 400,
  }

  function init(userOptions) {
    options = {
      ...options,
      ...userOptions,
    }
    console.log("test slider");
    options.list = document.querySelector('.slider__list');
    options.hidden = document.querySelector('.slider__hidden');
    options.slides = document.querySelectorAll('.slide');
    options.elements = document.querySelectorAll('.slider__item');
    options.firstElement = document.querySelector('.slider__item');
    options.leftArrow = document.querySelector('.slider__prev');
    options.rightArrow = document.querySelector('.slider__next');
    options.dotsElement = document.querySelector('.pagination');

    if (options.slides.length < options.currentSlide + 1) {
      options.currentSlide = options.slides.length - 1;
    }

    options.currentPositionsSlides = [];
    for (let i = 0; i < options.slides.length; i++) {
      options.currentPositionsSlides.push(i);
    }

    const elementStyle = window.getComputedStyle(options.firstElement);
    options.elementWidth = options.firstElement.offsetWidth + parseInt(elementStyle.marginLeft) +
      parseInt(elementStyle.marginRight);

    options.elementMarginRight = parseInt(elementStyle.marginRight);

    options.leftArrow.addEventListener('click', previousSlide);
    options.rightArrow.addEventListener('click', nextSlide);

    countVisibleSlides(options.elementsVisible);
    showArrows(options.arrows);
    showDots(options.dots);
    moveToSlide(options.currentSlide);
  };

  function countVisibleSlides(n) {
    const hiddenStyle = window.getComputedStyle(options.hidden);
    options.hidden.style.cssText = "";
    if (parseInt(hiddenStyle.width) < PHONES_WIDTH) {
      options.elementsVisible = 1;
      n = 1;
    }

    if (parseInt(hiddenStyle.width) > PHONES_WIDTH && parseInt(hiddenStyle.width) < TABLETS_WIDTH) {
      options.elementsVisible = 2;
      n = 2;
    }

    if (parseInt(hiddenStyle.width) > TABLETS_WIDTH) {
      options.elementsVisible = 3;
      n = 3;
    }

    if (parseInt(hiddenStyle.width) < options.elementWidth * n - options.elementMarginRight) {
      for (let i = 0; i < options.elements.length; i++) {
        options.elements[i].style.maxWidth = (parseInt(hiddenStyle.width) - (n - 1) * options.elementMarginRight) / n + "px";
      }
    } else {
      const marginRight = options.elementMarginRight;
      options.hidden.style.width = n * options.elementWidth - marginRight + "px";
    }

    options.firstElement = document.querySelector('.slider__item');
    const elementStyle = window.getComputedStyle(options.firstElement);
    options.elementWidth = options.firstElement.offsetWidth + parseInt(elementStyle.marginLeft) +
      parseInt(elementStyle.marginRight);

    options.elementMarginRight = parseInt(elementStyle.marginRight);
  }

  function previousSlide() {
    options.currentSlide === 0 ?
      moveToSlide(options.slides.length - 1) :
      moveToSlide(options.currentSlide - 1);
  }

  function nextSlide() {
    options.currentSlide === options.slides.length - 1 ?
      moveToSlide(0) :
      moveToSlide(options.currentSlide + 1);
  }

  function showArrows(isArrow) {
    if (isArrow) {
      options.leftArrow.style.display = "block";
      options.rightArrow.style.display = "block";
    } else {
      options.leftArrow.style.display = "none";
      options.rightArrow.style.display = "none";
    }
  }

  function showDots(isDots) {
    if (isDots) {
      let dotsHTML = "";
      const numberElement = options.currentPositionsSlides.findIndex(item => item === options.currentSlide);
      for (let i = 0; i < options.slides.length; i++) {
        dotsHTML += (i === numberElement) ?
          '<li class="pagination__item"><a href="#" class="pagination__link pagination__link_active"></a></li>' :
          '<li class="pagination__item"><a href="#" class="pagination__link"></a></li>';
        options.dotsElement.innerHTML = dotsHTML;
      }

      options.dotsAll = options.dotsElement.querySelectorAll('.pagination__link');
      for (let i = 0; i < options.dotsAll.length; i++) {
        options.dotsAll[i].addEventListener('click', function (e) {
          e.preventDefault();
          moveToSlide(i)
        });
      }
      options.dotsElement.style.display = "flex";
      options.dotsElement.style.display = "flex";
    } else {
      options.dotsElement.style.display = "none";
      options.dotsElement.style.display = "none";
    }
  }

  function moveLastElementToFirst() {
    options.list.style.right = "-" + options.elementWidth + "px";
    setTimeout(function () {
      options.list.style.cssText = 'transition:none;';
      options.currentPositionsSlides.unshift(options.currentPositionsSlides[options.currentPositionsSlides.length - 1]);
      options.currentPositionsSlides.pop();
      options.list.insertBefore(options.list.lastElementChild, options.list.firstElementChild);
      options.list.style.right = START_POSITION;
    }, options.speed)
  }

  function moveFirstElementToLast(startPosition, endPosition) {
    options.list.style.right = startPosition;
    setTimeout(function () {
      options.list.style.cssText = 'transition:none;';
      options.currentPositionsSlides.push(options.currentPositionsSlides[0]);
      options.currentPositionsSlides.shift();
      options.list.appendChild(options.list.firstElementChild);
      options.list.style.right = endPosition;
    }, options.speed)
  }

  function moveToSlide(numberSlide) {
    let numberElement = options.currentPositionsSlides.findIndex(item => item === numberSlide);
    let numberCurrentElement = 0;
    options.list.style.cssText = `transition: right ${options.speed}ms;`;

    switch (options.elementsVisible) {
      case 1:
        numberCurrentElement = options.currentPositionsSlides.findIndex(item => item === options.currentSlide);
        if (numberElement === options.currentPositionsSlides.length - 1 && numberCurrentElement === 0) {
          moveLastElementToFirst();
          break;
        }

        if (numberCurrentElement === options.currentPositionsSlides.length - 1 && numberElement === 0) {
          const startPosition = options.elementWidth * numberCurrentElement + options.elementWidth + "px";
          const endPosition = options.elementWidth * numberCurrentElement + "px";
          moveFirstElementToLast(startPosition, endPosition);
          break;
        }
        options.list.style.right = options.elementWidth * numberElement + "px";

      case 2:
        numberCurrentElement = options.currentPositionsSlides.findIndex(item => item === options.currentSlide);
        if (numberElement === options.currentPositionsSlides.length - 1 && numberCurrentElement === 0) {
          moveLastElementToFirst();
          break;
        }

        if (numberElement === options.currentPositionsSlides.length - 1) {
          const startPosition = options.elementWidth * numberElement + "px";
          const endPosition = options.elementWidth * numberElement - options.elementWidth + "px";
          moveFirstElementToLast(startPosition, endPosition);
          break
        }
        options.list.style.right = options.elementWidth * numberElement + "px";
        break;

      case 3:
        if (numberElement === 0) {
          moveLastElementToFirst();
          break;
        }

        if (numberElement === options.currentPositionsSlides.length - 1) {
          const startPosition = options.elementWidth * numberElement - options.elementWidth + "px";
          const endPosition = options.elementWidth * numberElement - 2 * options.elementWidth + "px";
          moveFirstElementToLast(startPosition, endPosition);
          break;
        }
        options.list.style.right = options.elementWidth * numberElement - options.elementWidth + "px";
        break;

      default:
        options.list.style.right = START_POSITION;
        break;
    }

    numberElement = options.currentPositionsSlides.findIndex(item => item === numberSlide);
    for (let i = 0; i < options.dotsAll.length; i++) {
      options.dotsAll[i].classList.remove('pagination__link_active');
      options.slides[i].classList.remove('slide__active');
    }
    options.dotsAll[options.currentPositionsSlides[numberElement]].classList.add('pagination__link_active');
    options.slides[options.currentPositionsSlides[numberElement]].classList.add('slide__active');
    options.currentSlide = numberSlide;
  }

  return {
    init,
  };

})();

export default Slider;
