const _flash = new Map();

function setItem(name, data) {
  if (!name) return;
  _flash.set(name, data);
}

function getItem(name) {
  return _flash.get(name);
}

function removeItem(name) {
  _flash.delete(name);
}

const func_pkgs = {
  setItem,
  getItem,
  removeItem,
};

export default {
  install(target) {
    target.prototype.$flash = func_pkgs;
  },
  $instance: func_pkgs,
};
