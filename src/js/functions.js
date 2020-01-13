let setVH = () => {
  // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
  let vh = window.innerHeight * 0.01;
  // Then we set the value in the --vh custom property to the root of the document
  document.documentElement.style.setProperty("--vh", `${vh}px`);
};

let setHeroSlideAR = ww => {
  if (ww >= 768 && ww < 1200) {
    var pb = getAR(690, 768);

    document.documentElement.style.setProperty("--hsAR", `${pb}`);
  } else if (ww >= 1200) {
    var pb = getAR(700, 1440);

    document.documentElement.style.setProperty("--hsAR", `${pb}`);
  }
};

let getAR = (h, w) => {
  var mode = null;

  if (h > w) {
    dividend = h;
    divisor = w;
    mode = "portrait";
  }

  if (w > h) {
    dividend = w;
    divisor = h;
    mode = "landscape";
  }

  var gcd = -1;
  while (gcd == -1) {
    remainder = dividend % divisor;
    if (remainder == 0) {
      gcd = divisor;
    } else {
      dividend = divisor;
      divisor = remainder;
    }
  }

  var hr = w / gcd;
  var vr = h / gcd;
  aspectRatio = hr / vr;
  return aspectRatio;
};
