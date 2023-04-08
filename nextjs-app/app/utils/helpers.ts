export function percentExpired(range: number, current: number): number {
  return (1 - (current / range)) * 100;
}

export function joinClasses(...args: (string|object)[]) {
  return args.map((arg) => {
    if (typeof arg === 'string') {
      return arg;
    } else if (typeof arg === 'object') {
      const [className, bool] = Object.entries(arg)[0];
      if (!bool) return;
      return className;
    }
  }).join(' ')
}
