export function setBooleanValue(num) {
  if (Number.isInteger(num)) {
    if (num == 1) {
      return true;
    } else {
      return false;
    }
  }
}

export function setNodeId(num) {
  if (Number.isInteger(num)) {
    if (num < 10) {
      return "0" + num;
    } else {
      return num + "";
    }
  }
}
