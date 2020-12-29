function setItem(name, data) {
  if (!name) return;
  if (typeof data !== 'string') {
    data = JSON.stringify(data);
  }
  window.localStorage.setItem(name, data);
}

function getItem(name) {
  if (!name) return;
  return window.localStorage.getItem(name);
}

function getJsonItem(name, d_value = null) {
  if (!name) return;
  try {
    return JSON.parse(window.localStorage.getItem(name));
  } catch (e) {
    return d_value;
  }
}

function removeItem(name) {
  if (!name) return;
  window.localStorage.removeItem(name);
}

const func_pkgs = {
  setItem,
  getItem,
  removeItem,
  getJsonItem,
};

export default {
  install(target) {
    target.prototype.$storage = func_pkgs;
  },
  $instance: func_pkgs,
};
