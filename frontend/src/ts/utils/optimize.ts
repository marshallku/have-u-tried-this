const DEFAULT_WAIT = 500;

export function fit(func: () => any): () => void {
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

export function throttle(func: () => any, wait = DEFAULT_WAIT): () => void {
  let timer: ReturnType<typeof setTimeout> | null;

  return () => {
    if (!timer) {
      timer = setTimeout(() => {
        timer = null;
        func();
      }, wait);
    }
  };
}

// eslint-disable-next-line no-unused-vars
export function debounce(
  func: (...args: any) => any,
  wait = DEFAULT_WAIT,
): (...args: any) => void {
  let timer: ReturnType<typeof setTimeout>;

  return (...args: any) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func(...args);
    }, wait);
  };
}
