import getTokenAsync from './authService';

export function login(email, password) {
  return getTokenAsync({ email, password });
}

export function getUserByToken(email, password) {
  // Authorization head should be fulfilled in interceptor.
  return getTokenAsync({ email, password });
}
