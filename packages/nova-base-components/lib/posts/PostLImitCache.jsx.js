/**
 * Created by k on 9/15/16.
 */
SessionLocal = {
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

LastListLimit = {
  __lastKey: null,
  set(){

  },
  get(){


    return Telescope.settings.get("postsPerPage", 10);
  }
};

export default SessionLocal
export default LastListLimit
