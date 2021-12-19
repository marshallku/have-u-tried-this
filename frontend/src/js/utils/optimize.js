const DEFAULT_WAIT = 500;

export function fit(func) {
  let ticking = false;

  return () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(() => {
        func();
        ticking = false;
      });
    }
  };
}

export function throttle(func, wait = DEFAULT_WAIT) {
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

export function debounce(func, wait = DEFAULT_WAIT) {
  let timer;

  return () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func();
    }, wait);
  };
}
