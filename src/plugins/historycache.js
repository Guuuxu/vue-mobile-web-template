function setItem(name, value, amount = 20) {
  if (!name || !value) return;
  let historyData = JSON.parse(localStorage.getItem(name));
  if (historyData) {
    historyData.unshift(value);
    historyData = [...new Set(historyData)];
    if (historyData.length > amount) {
      historyData.pop();
    }
    value = JSON.stringify(historyData);
  } else {
    value = JSON.stringify([value]);
  }
  return localStorage.setItem(name, value);
}

function getItem(name) {
  if (!name) return;
  return localStorage.getItem(name)
    ? JSON.parse(localStorage.getItem(name))
    : [];
}

function removeSingleItem(name, value) {
  if (!name) return;
  const historyData = JSON.parse(localStorage.getItem(name));
  if (!historyData) return;
  // eslint-disable-next-line eqeqeq
  const index = historyData.findIndex((val) => val == value);
  if (index > -1) historyData.splice(index, 1);
  localStorage.setItem(name, JSON.stringify(historyData));
}

function removeAllItem(name) {
  if (!name) return;
  localStorage.removeItem(name);
}

const func_pkgs = {
  setItem,
  getItem,
  removeSingleItem,
  removeAllItem,
};
export default {
  install(target) {
    target.prototype.$historyCache = func_pkgs;
  },
  $instance: func_pkgs,
};
