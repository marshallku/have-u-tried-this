export function fit(callback) {
  let ticking = false;

  return () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(() => {
        callback();
        ticking = false;
      });
    }
  };
}

export function throttle(func, wait) {
  let timer;

  return () => {
    if (!timer) {
      timer = setTimeout(() => {
        timer = null;
        func();
      }, wait);
    }
  };
}

export function debounce(func, wait) {
  let timer;

  return () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func();
    }, wait);
  };
}
