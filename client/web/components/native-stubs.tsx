export default {};

export const setJSExceptionHandler = (handler: any, allowInDev?: boolean) => {
  if (typeof window !== 'undefined') {
    window.onerror = (message, source, lineno, colno, error) => {
      handler(error || new Error(String(message)), false);
    };
  }
};

export const setNativeExceptionHandler = () => {};

export const authorize = async () => {
  return { accessToken: 'web-access-token', idToken: 'web-id-token' };
};
