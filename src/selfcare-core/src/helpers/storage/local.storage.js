import { log } from '../log';

const supportsLocalStorage = () => {
  return typeof window !== 'undefined' && window.localStorage ? true : false;
};

export function read(key) {
  let item;
  if (supportsLocalStorage()) {
    try {
      item = JSON.parse(window.localStorage.getItem(key));
    } catch (e) {
      item = null;
    }
  } else {
    log(`Local Storage is not detected for the browser. Cannot read ${key}`);
  }
  return item;
}

export function write(key, json) {
  if (supportsLocalStorage()) {
    window.localStorage.setItem(key, JSON.stringify(json));
  } else {
    log(`Local Storage is not detected for the browser. Cannot write ${key}`);
  }
}

export function writeOnce(key, json) {
  if (supportsLocalStorage()) {
    const retrieved = read(key);

    if (retrieved === null || retrieved === undefined) {
      write(key, json);
    }
  } else {
    log(`Local Storage is not detected for the browser. Cannot write ${key}`);
  }
}

export function remove(key) {
  if (supportsLocalStorage()) {
    window.localStorage.removeItem(key);
  } else {
    log(`Local Storage is not detected for the browser. Cannot remove ${key}`);
  }
}
