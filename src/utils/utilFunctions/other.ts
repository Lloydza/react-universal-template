/**
 * Validates whether the given email is valid
 * @param  {String} email : The email to validate
 * @return {Boolean} : A boolean indicating the email validity
 */
export const isValidEmail = (email: string): boolean => {
  if (!email) {
    return false;
  }

  if (/^[A-Za-z0-9](\.?[A-Za-z0-9_-]){0,}@[A-Za-z0-9-]+\.([a-z]{1,6}\.)?[a-z]{2,6}$/i.test(email)) {
    return true;
  }

  return false;
};

/**
 * Find all the parameters in a given url
 * These are all the parameters set after the "?"
 * @param  {String} path : The url from which to pull parameters
 * @return {Object} : A dictionary containing all parameter key values
 */
export const findQueryParams = (path: string): GenericObject => {
  const queryParams = {};
  if (!path) {
    return queryParams;
  }

  const queryPathIndex = path.indexOf('?');

  if (queryPathIndex === -1) {
    return queryParams;
  }

  const queryStringSection = path.substring(queryPathIndex + 1, path.length);
  if (!queryStringSection || queryStringSection.length === 0) {
    return queryParams;
  }

  const queryParamsArray = queryStringSection.split('&');
  if (!queryParamsArray || queryParamsArray.length === 0) {
    return queryParams;
  }

  queryParamsArray.forEach((item: string) => {
    const keyValuePairIndex = item.indexOf('=');

    if (keyValuePairIndex < 1) {
      return;
    }

    const key = item.substring(0, keyValuePairIndex);
    const val = item.substring(keyValuePairIndex + 1, item.length);

    queryParams[decodeURIComponent(key)] = decodeURIComponent(val);
  });

  return queryParams;
};

/**
 * Validates a given password against our password requirements
 * @param  {string} value : The password to validate
 * @return {Boolean} : A boolean indicating password validity
 */
export const isValidPassword = (value: string): boolean => {
  if (!value) {
    return false;
  }
  if (value && !/^(?=.*?[a-z])(?=.*?[0-9]).{8,}$/.test(value)) {
    return false;
  }
  return true;
};

/**
 * Promisifies setTimeout(), to allow it to be added to a promise chain.
 * @param  {BigInteger} milliseconds : The milliseconds to wait for
 */
export const waitSetTime = (milliseconds: number): Promise<void> => {
  return new Promise((resolve: () => void) => {
    setTimeout(() => {
      resolve();
    }, milliseconds);
  });
};

/**
 * Throws an error manually
 * @param {String} messageId The id of the response message (used to look up the response object)
 * @param {BigInteger} errCode The HTTP error code (defaults to 400)
 */
export const error = (messageId: string = '', code: number = 500): Error => {
  const err = new Error() as any;
  err.code = code;
  err.messageId = messageId;
  return err;
};
