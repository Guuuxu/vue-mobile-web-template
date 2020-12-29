function setItem(key, value) {
  if (!key || !JSON.stringify(value)) {
    console.error('setItem 2 arguments required !');
    return;
  }
  if (typeof key !== 'string') {
    console.error('key must be string');
    return;
  }
  if (typeof value !== 'string') {
    value = JSON.stringify(value);
  }
  return window.sessionStorage.setItem(key, value);
}

function getItem(key) {
  if (!key) {
    console.error('getItem 1 arguments required !');
    return;
  }
  if (typeof key !== 'string') {
    console.error('key must be string');
    return;
  }
  return window.sessionStorage.getItem(key);
}

function getJsonItem(key) {
  if (!key) {
    console.error('getItem 1 arguments required !');
    return;
  }
  if (typeof key !== 'string') {
    console.error('key must be string');
    return;
  }
  try {
    return JSON.parse(window.sessionStorage.getItem(key));
  } catch (e) {
    return null;
  }
}

function removeItem(key) {
  if (!key) {
    console.error('getItem 1 arguments required !');
    return;
  }
  if (typeof key !== 'string') {
    console.error('key must be string');
    return;
  }
  return window.sessionStorage.removeItem(key);
}

function clearAll() {
  return window.sessionStorage.clear();
}

const funcPkg = {
  setItem,
  getItem,
  removeItem,
  getJsonItem,
  clearAll,
};
export default {
  install(vue) {
    vue.prototype.$sessionStorage = funcPkg;
  },
  $instance: funcPkg,
};
