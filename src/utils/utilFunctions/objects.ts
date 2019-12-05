/**
 * Checks a given object to see if its empty
 * @param  {Object} obj : The object to check
 * @return {Boolean} : A boolean indicating password validity
 */
export const isObjectEmpty = (obj: GenericObject): boolean => {
  if (!obj) {
    return true;
  }

  return Object.keys(obj).length === 0;
};

/**
 * Counts the number of properties a given object has
 * @param  {Object} obj : The object to count properties of
 * @return {BigInteger} : The number of properties in the object
 */
export const numberOfProperties = (obj: GenericObject): number => {
  if (!obj) {
    return 0;
  }

  return Object.keys(obj).length;
};
