import localforage from 'localforage';

localforage.config({
  driver: [localforage.INDEXEDDB, localforage.WEBSQL, localforage.LOCALSTORAGE],
  name: 'garage_garager_app_web',
  storeName: 'garage_garager_app_web_store',
  version: '1.0',
  description: 'app数据缓存',
});

function time_stamp() {
  return ~~(new Date().getTime() / 1000);
}

function get_hash_key(namespace, params = {}) {
  return namespace + JSON.stringify(params);
}

function _wrapper(fetcher_name, fetcher, expire = 300, use_callee, cacher) {
  return function () {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      let do_use = true;
      if (typeof use_callee === 'function') {
        do_use = !!use_callee(...arguments);
      }
      if (do_use) {
        let hash_key = get_hash_key(fetcher_name, arguments);
        try {
          let wrapper_data = await cacher.getItem(hash_key);
          if (wrapper_data) {
            resolve(wrapper_data.data);
          }
          if (
            !wrapper_data ||
            (!!wrapper_data && wrapper_data.expire < time_stamp())
          ) {
            fetcher(...arguments)
              .then((data) => {
                cacher
                  .setItem(hash_key, { data, expire: time_stamp() + expire })
                  .then(() => {
                    resolve(data);
                  })
                  .catch((e) => reject(e));
              })
              .catch((e) => reject(e));
          }
        } catch (e) {
          fetcher(...arguments)
            .then((data) => {
              cacher
                .setItem(hash_key, { data, expire: time_stamp() + expire })
                .then(() => {
                  resolve(data);
                })
                .catch((e) => reject(e));
            })
            .catch((e) => reject(e));
        }
      } else {
        fetcher(...arguments)
          .then((data) => resolve(data))
          .catch((e) => reject(e));
      }
    });
  };
}

function db_wrapper(fetcher_name, fetcher, expire = 300, use_callee) {
  return _wrapper(fetcher_name, fetcher, expire, use_callee, localforage);
}
function clearAll() {
  return localforage.clear();
}

const func_pkgs = {
  wrapper: db_wrapper,
  clearAll,
};

export default {
  install(target) {
    target.prototype.$cacher = func_pkgs;
  },
  $instance: func_pkgs,
};
