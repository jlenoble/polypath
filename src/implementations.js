/* eslint-disable no-invalid-this */
export const _true = function () {
  return true;
};

export const _false = function () {
  return false;
};

export const _testRight = function (obj) {
  return obj.test(this.chunk);
};
