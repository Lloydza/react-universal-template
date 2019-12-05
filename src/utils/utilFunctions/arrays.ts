import clonedeep from 'lodash/cloneDeep';

/**
 * Finds the index of an item in an array. The default array.findIndex() is unsupported on some browsers
 * @param  {Array} arr : The array to search
 * @param  {Function} findFunction : the function used to evaluate the current item
 * @return {Number} : The index of the item, or -1 if not found
 */
export const findIndexInArray = (arr: any[], findFunction: (item: any) => boolean): number => {
  if (!arr || arr.length === 0) {
    return -1;
  }

  let index = -1;
  for (let i = 0; i < arr.length; i += 1) {
    if (findFunction(arr[i])) {
      index = i;
      break;
    }
  }

  return index;
};

/**
 * Finds the item in an array. The default array.find() is unsupported on some browsers
 * @param  {Array} arr : The array to search
 * @param  {Function} findFunction : the function used to evaluate the current item
 * @return {Any} : The item, or null if not found
 */
export const findInArray = (arr: any[], findFunction: (item: any) => boolean): any => {
  if (!arr || arr.length === 0) {
    return null;
  }

  let item = null;
  for (let i = 0; i < arr.length; i += 1) {
    if (findFunction(arr[i])) {
      item = arr[i];
      break;
    }
  }

  return item;
};

/**
 * Removes the item at the given index in an array
 * @param  {Array} arr : The array to remove from
 * @param  {BigInteger} index : The index to remove at
 * @return {Array} : The new array
 */
export const removeItemFromArray = (arr: any[], index: number): any[] => {
  if (!arr || index === null || index < 0) {
    return arr;
  }

  const beginningArray = clonedeep(arr.slice(0, index));
  const afterArray = clonedeep(arr.slice(index + 1));
  return beginningArray.concat(afterArray);
};

/**
 * Replaces an item at the given index in an array
 * @param  {Array} arr : The array
 * @param  {BigInteger} index : The index to replace at
 * @param  {any} item : The item to replace at the index
 * @return {Array} : The new array
 */
export const replaceItemInArray = (arr: any[], index: number, item: any): any[] => {
  if (!arr || index === null || index < 0) {
    return arr;
  }

  const beginningArray = clonedeep(arr.slice(0, index));
  const updatedItem = clonedeep(item);
  const afterArray = clonedeep(arr.slice(index + 1));
  return beginningArray.concat(updatedItem).concat(afterArray);
};

/**
 * Moves an item in an array to a new position
 * @param  {Array} arr : The array reorder
 * @param  {BigInteger} currentItemIndex : The index of the item currently
 * @param  {BigInteger} newItemIndex : The index of the item for its new position
 * @return {Array} : The reordered array
 */
export const moveItemInArray = (
  arr: any[],
  currentItemIndex: number,
  newItemIndex: number,
): any[] => {
  if (!arr || !arr[currentItemIndex] || !arr[newItemIndex]) {
    return arr;
  }
  const newArr = clonedeep(arr);
  const item = newArr.splice(currentItemIndex, 1)[0];
  newArr.splice(newItemIndex, 0, item);
  return newArr;
};
