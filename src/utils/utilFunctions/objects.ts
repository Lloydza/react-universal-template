import clonedeep from 'lodash/cloneDeep';

/**
 * Checks a given object to see if its empty
 * @param  {Object} obj : The object to check
 * @return {Boolean} : A boolean indicating password validity
 */
export const isObjectEmpty = (obj: GenericObject): boolean => {
  if (!obj) {
    return true;
  }

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      return false;
    }
  }

  return true;
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

  let count = 0;
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      count += 1;
    }
  }

  return count;
};

/**
 * Deeply clones an object (complete independant new copy)
 * @param  {Object} objectToClone : The object to clone
 * @return {Object} : A new clone
 */
export const deeplyCloneObject = (objectToClone: GenericObject | any[]): GenericObject | any[] => {
  return clonedeep(objectToClone);
};
