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
    // console.log('Telescope.plus.LastListLimit.set()');
    // console.log(value, this.__lastKey);
    // update the last limit only if the new value bigger than last limit
    // otherwise, reset the last limit to step
    if (value > this.__lastLimit) {
      this.__lastLimit = value;
    }
    // else{
    //   this.__lastLimit = this.__step;
    // }
  },
  get(params){
    // console.log({params, 'LastListLimit.get': 1});
    // return 10;
    let key = this.generate_key(params);
    // if key are same, return last limit
    // otherwise, return the default page limit
    console.log(key + ":" + this.__lastKey + ":" + this.__lastLimit + ":" + 'this.key + ":" + this.__lastKey');

    if (key === this.__lastKey) {
      return this.__lastLimit;
    } else {
      this.__lastKey = key;
      this.__lastLimit = this.__step;
      console.log(this.__lastLimit + ":" + this.__step + 'this.__lastLimit + ":" + this.__step');
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

Telescope.plus.ViewHostory = {
  _oldData: {},
  append(post){
    // here we use a list to store each id of the post, in order to show the last visiting post first
    // use an object to store all the post objects.
    let list = this.get_keys();
    let dict = this.get();

    // console.log(list);
    // get current time
    let now = new Date().toLocaleString();
    console.log(now);
    // update the last visit time to now
    post.lastVisit = now;
    //list only store post id in time order
    let id = post._id;
    let visited = this.get(id);
    let visitHistory;
    // check if the user has visited this post before
    // if visited, merge the visit History
    if (visited) {
      visitHistory = visited.visitHistory;
    }
    // if has old history, insert new visiting date in the front
    if (visitHistory) {
      visitHistory.unshift(now);
    } else {
      // otherweise, create a new list.
      visitHistory = [now];
    }
    // put the visit history back to the post object.
    post.visitHistory = visitHistory;
    list.unshift(id);
    dict[id] = post;
    // remove the duplicated id in the list.
    list = _.unique(list);
    // console.log('list1s');
    // console.log(list);
    Telescope.plus.SessionLocal.set('post-history-list', JSON.stringify(list));
    Telescope.plus.SessionLocal.set('post-history-dict', JSON.stringify(dict));
    if (this.isShowing()) {
      this.show();
    }
  },
  get_keys(){
    return JSON.parse(Telescope.plus.SessionLocal.get('meeting-history-list', true));
  },
  get(id = false){
    const dict = JSON.parse(Telescope.plus.SessionLocal.get('meeting-history-dict', true));
    if (id) {
      return dict[id];
    }
    return dict;
  },
  get_data(){ // return ordered view history
    const posts_history = [];
    const posts = this.get();
    _.map(this.get_keys(), function (key) {
      posts_history.push(posts[key])
    });
    return posts_history;
  },
  show(){
    Session.set('meeting-history', true);
    let meeting_history = [];
    let dict = this.get();
    let list = this.get_keys(); // this is a ordered list
    console.log('list');
    console.log(list);

    if (list) {
      for (let id of list) {
        meeting_history.push(dict[id]);
      }
    }
  },
  isShowing(){
    return Session.get('meeting-history');
  },
  hide(){
    Session.set('meeting-history', false);
    // if(isShowing())
    //     Session.set('tabs', 'meeting');
  }
};

//---------------------------------------- ChangeServer ----------------------------//

Telescope.plus.changeServer = (app_url) => {
  try {
    Meteor.connection = Meteor.connect(app_url);
    _.each(['subscribe', 'methods', 'call', 'apply', 'status', 'reconnect', 'disconnect'],
      function (name) {
        Meteor[name] = _.bind(Meteor.connection[name], Meteor.connection);
      });
    Package.reload = true;
    Accounts.connection = Meteor.connection;
    return 'New server: ' + app_url;
  } catch (e) {
    console.log(e);
  }

};

Telescope.plus.autoSwitchServer = {
  default_source: ['https://raw.githubusercontent.com/rockkoca/qidian-server/master/servers/json.json'],
  backup_source_key: 'server_sources',
  fetch(){
    this.unblock();
    const self = this;
    Meteor.http.call("GET", this.default_source[0], function (error, response) {
      // if no error, switch the server
      if (!error) {
        self.switch(response.content)
      } else {
        // else, try to this again
        Meteor.setTimeout(function () {
          self.fetch();
        }, 3000);
      }
    });
    console.log(sources);
    return JSON.parse(sources.content)
  },
  switch(content = false){
    if (content) {
      Telescope.plus.changeServer(JSON.parse(content)[0].url);
    } else {
      this.fetch();
    }
  }
};

Meteor.startup(function () {
  if (Meteor.isCordova) {
    Tracker.autorun(function () {
      if (!Meteor.connection) {
        // Telescope.plus.autoSwitchServer.switch();
      }
    });
    if (Meteor.isClient) {
      // Telescope.plus.changeServer('http://192.168.0.20:3100');
      // Meteor.connection = DDP.connect('http://192.168.0.20:3100');
      // Accounts.connection = Meteor.connection;
      // // Meteor.users = new Meteor.Collection('users');
      // // Meteor.connection.subscribe('users');
      // // Meteor.connection.subscribe('remote_collection');
      // // rest if the code just as always
      // _.each(['subscribe', 'methods', 'call', 'apply', 'status', 'reconnect', 'disconnect'], function (name) {
      //   Meteor[name] = _.bind(Meteor.connection[name], Meteor.connection);
      // });
    }
  }
});
