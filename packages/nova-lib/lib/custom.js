/**
 * Created by k on 9/15/16.
 */
import Telescope from './config.js';
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
  set(key, value){
    Telescope.plus.SessionLocal.set(key, value);
  },
  get(params){
    let key = '';
    let defaultLimit = Telescope.settings.get("postsPerPage", 10);
    if (params.view) {
      key += params.view
    }
    if (params.cat) {
      key += '-' + params.cat
    }
    if (params.query) {
      key += '-' + params.query
    }
    if(key === this.__lastKey && Telescope.plus.SessionLocal.get(key)) {
      return Telescope.plus.SessionLocal.get(key)
    }else if(key === this.__lastKey){
      this.set(key, defaultLimit)
    }
    return defaultLimit;
  }
};

