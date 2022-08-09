export const isEmpty = (object: Object) =>
  object ? Object.keys(object).length === 0 : true;
