export const HOST_SERVER_ADDRESS = (typeof process !== 'undefined' && process.env?.HOST_SERVER_ADDRESS) || 'http://localhost:3000';
export const API_BASE_URL = `${HOST_SERVER_ADDRESS}/api`;
export default { HOST_SERVER_ADDRESS, API_BASE_URL };
