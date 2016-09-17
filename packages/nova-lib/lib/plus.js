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
  __step: Telescope.settings.get("postsPerPage", 10),
  __lastLimit: this.__step,
  set(value){
    console.log('Telescope.plus.LastListLimit.set()');
    console.log(value, this.__lastKey);
    // update the last limit only if the new value bigger than last limit
    // otherwise, reset the last limit to step
    if(value > this.__lastLimit) {
      this.__lastLimit = value;
    }
    // else{
    //   this.__lastLimit = this.__step;
    // }
  },
  get(params){
    console.log({params, 'LastListLimit.get': 1});
    let key = this.generate_key(params);
    // if key are same, return last limit
    // otherwise, return the default page limit
    if(key === this.__lastKey) {
      return this.__lastLimit;
    }else{
      this.__lastKey = key;
      this.__lastLimit = this.__step;
      return this.__step;
    }
  },
  generate_key(params){
    let key = '';
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
    return key;
  }
};

