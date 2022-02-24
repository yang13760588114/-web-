export function setBooleanValue(num) {
  if (Number.isInteger(num)) {
    if (num == 1) {
      return true;
    } else {
      return false;
    }
  }
}
