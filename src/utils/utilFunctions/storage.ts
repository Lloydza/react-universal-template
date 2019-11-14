/**
 * Gets an item in local storage
 * @param  {string} key : The key to get
 * @param  {Boolean} shouldParse : Indicates whether to try parse the value at the key
 * @return {string} : The item in local storage
 */
export const localStorageGetItem = (key: string, shouldParse: boolean = false): any => {
  if (!key) {
    return null;
  }

  try {
    const value = localStorage.getItem(key);

    if (shouldParse && value) {
      try {
        const parsedItem = JSON.parse(value);
        return parsedItem;
      } catch (parseError) {
        return value;
      }
    }

    return value;
  } catch (err) {
    return null;
  }
};

/**
 * Sets an item in local storage
 * @param  {String} key : The key to set
 * @param  {String} key : The value to set the key to
 * @return {Null} : Null, or error if not successful
 */
export const localStorageSetItem = (key: string, value: any): string => {
  if (!key) {
    return 'key not set';
  }

  if (!value) {
    return 'value not set';
  }

  try {
    const addValue = typeof value === 'string' ? value : JSON.stringify(value);
    localStorage.setItem(key, addValue);
    return null;
  } catch (err) {
    return err.message;
  }
};

/**
 * Removes an item in local storage
 * @param  {string} key : The key to remove
 * @return {Boolean} : True if successfuly removed, otherwise false
 */
export const localStorageRemoveItem = (key: string): boolean => {
  if (!key) {
    return false;
  }

  try {
    localStorage.removeItem(key);
    return true;
  } catch (err) {
    return false;
  }
};

/**
 * Sets the cookie of a given key to the given value
 * @param  {String} key : The key to set at
 * @param  {String} value : The value to set to
 */
export const setCookie = (key: string, value: any): void => {
  let valueToStore = value;

  if (valueToStore !== null && typeof valueToStore === 'object') {
    valueToStore = JSON.stringify(valueToStore);
  }

  try {
    const expirationDate = new Date();
    expirationDate.setFullYear(expirationDate.getFullYear() + 100);
    document.cookie = `${key}=${valueToStore}; path=/; expires=${expirationDate.toUTCString()}`;
  } catch (err) {
    // Do nothing
  }
};

/**
 * Gets the cookie for a given key
 * @param  {String} key : The key to get the value for
 * @return {String} : The value at the given key
 */
export const getCookie = (key: string): any => {
  if (typeof document === 'undefined') {
    return null;
  }

  try {
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(';');

    let result = null;
    for (let i = 0; i < cookieArray.length; i += 1) {
      let item = cookieArray[i];
      while (item.startsWith(' ')) {
        item = item.substring(1);
      }

      if (item.startsWith(`${key}=`)) {
        result = item.substring(key.length + 1, item.length);

        if (result.charAt(0) === '{') {
          result = JSON.parse(result);
        }

        break;
      }
    }

    return result;
  } catch (err) {
    return null;
  }
};

/**
 * Deletes the cookie for a given key
 * @param  {String} key : The key to delete the value for
 * @return {String} : The value at the given key
 */
export const deleteCookie = (key: string): void => {
  try {
    const d = new Date();
    document.cookie = `${key}=; path=/; expires=${d};`;
  } catch (err) {
    // Do nothing
  }
};

/**
 * Deletes all cookies
 */
export const deleteAllCookies = (): void => {
  try {
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(';');

    for (let i = 0; i < cookieArray.length; i += 1) {
      const cookie = cookieArray[i];
      const eqPos = cookie.indexOf('=');
      const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT`;
    }
  } catch (err) {
    // Do nothing
  }
};
