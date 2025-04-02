window.onload = () => {
  animateBackground();
  setInterval(animateBackground, 2l00);
};

let xSign = 1, ySign = 1;
let counter = 0;

function animateBackground() {
  const minSkew = 8;
  const maxSkew = 10;
  const skewX = xSign * random(minSkew, maxSkew);
  const skewY = ySign * random(minSkew, maxSkew);

  const minTranslate = 10;
  const maxTranslate = 15;
  const translateX = xSign * random(minTranslate, maxTranslate);
  const translateY = ySign * random(minTranslate, maxTranslate);

  if (counter % 2 == 0) {
    xSign *= -1;
  } else {
    ySign *= -1;
  }

  counter++;

  const backgroundImage = document.querySelector(".background-image");
  backgroundImage.style.transform = `skew(${skewX}deg, ${skewY}deg) translate(${translateX}vw, ${translateY}vh)`;
}

function random(min, max) {
  let val = max * Math.random();

  if (Math.abs(val) < min) {
    val = min;
  }

  return val;
}
