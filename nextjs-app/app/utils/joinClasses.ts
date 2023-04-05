export default function joinClasses(...args: (string|object)[]) {
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
