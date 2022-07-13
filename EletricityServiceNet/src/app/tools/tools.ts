export function wait(
  whether: () => boolean,
  reject: () => void,
  timeout = 100
) {
  setTimeout(() => {
    if (whether()) {
      reject();
    } else {
      wait(whether, reject, timeout);
    }
  }, timeout);
}
