import { log } from '../log';

const supportsSessionStorage = () => {
  return typeof window !== 'undefined' && window.sessionStorage ? true : false;
};

export function read(key) {
  let item;
  if (supportsSessionStorage()) {
    item = JSON.parse(window.sessionStorage.getItem(key));
  } else {
    log(`Session Storage is not detected for the browser.  Cannot read ${key}`);
  }
  return item;
}

export function write(key, json) {
  if (supportsSessionStorage()) {
    window.sessionStorage.setItem(key, JSON.stringify(json));
  } else {
    log(`Session Storage is not detected for the browser.  Cannot write ${key}`);
  }
}

export function remove(key) {
  if (supportsSessionStorage()) {
    window.sessionStorage.removeItem(key);
  } else {
    log(`Session Storage is not detected for the browser.  Cannot remove ${key}`);
  }
}
