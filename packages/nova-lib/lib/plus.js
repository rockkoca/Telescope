/**
 * Created by k on 9/15/16.
 */
import Telescope from './config.js';
/**
 * @summary The global namespace for Telescope utils.
 * @namespace Telescope.utils
 */
Telescope.plus = {};
Telescope.plus.SessionLocal = {
  set: function (key, val) {
    // var time = new Data().getTime();
    // var value = {
    //     time: time,
    //     val: val
    // };
    localStorage.setItem(key, val);

    Session.set(key, val);
  },
  get: function (key, local = false) {
    // // console.log(localStorage.getItem(key) + 'local');
    // // console.log(Session.get(key) + 'session');
    if (local) {
      return localStorage.getItem(key);
    }
    var data = Session.get(key);
    if (data === undefined) {
      return localStorage.getItem(key);
    }

    return data;
    // return localStorage.getItem(key);
  },
  setDefault: function (key, val) {
    Session.setDefault(key, val);
    if (!localStorage.getItem(key)) {
      localStorage.setItem(key, val);
    }

  }
};

Telescope.plus.LastListLimit = {
  __lastKey: null,
  set(key = false, value){
    if (key) {
      return;
    }
    // if no key is given, update the last key
    if (this.__lastKey) {
      Telescope.plus.SessionLocal.set(this.__lastKey, value);
    }

  },
  get(params){
    let key = '';
    let defaultLimit = Telescope.settings.get("postsPerPage", 10);
    if (params) {
      if (params.view) {
        key += params.view
      }
      if (params.cat) {
        key += '-' + params.cat
      }
      if (params.query) {
        key += '-' + params.query
      }
    }
    // if no params,
    console.log(key + ": " + Telescope.plus.SessionLocal.get(key));
    if (key === this.__lastKey && Telescope.plus.SessionLocal.get(key)) {
      return Telescope.plus.SessionLocal.get(key)
    } else if (key === this.__lastKey) {
      this.set(key, defaultLimit)
    }
    return defaultLimit;
  }
};

