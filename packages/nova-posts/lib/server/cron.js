import Posts from '../collection.js';
import moment from 'moment';

SyncedCron.options = {
  log: true,
  collectionName: 'cronHistory',
  utc: false,
  collectionTTL: 172800
};


const addJob = function () {
  SyncedCron.add({
    name: 'checkScheduledPosts',
    schedule(parser) {
      return parser.text('every 10 minutes');
    },
    job() {
      // fetch all posts tagged as future
      const scheduledPosts = Posts.find({isFuture: true}, {fields: {_id: 1, status: 1, postedAt: 1, userId: 1, title: 1}}).fetch();

      // filter the scheduled posts to retrieve only the one that should update, considering their schedule
      const postsToUpdate = scheduledPosts.filter(post => post.postedAt <= new Date());

      // update posts found
      if (!_.isEmpty(postsToUpdate)) {
        const postsIds = _.pluck(postsToUpdate, '_id');
        Posts.update({_id: {$in: postsIds}}, {$set: {isFuture: false}}, {multi: true});

        // log the action
        console.log('// Scheduled posts approved:', postsIds);
      }
    }
  });
};

Meteor.startup(function () {
  addJob();
  Posts.createIndex({createdAt: -1}, {background: true});
  Posts.createIndex({createdAt: 1}, {background: true});
  Posts.createIndex({postedAt: -1}, {background: true});
  Posts.createIndex({postedAt: 1}, {background: true});
  Posts.createIndex({commenters: -1}, {background: true});
  Posts.createIndex({userId: -1}, {background: true});
  Posts.createIndex({userId: 1}, {background: true});
  Posts.createIndex({isFuture: -1}, {background: true});
  Posts.createIndex({upvotes: -1}, {background: true});
  Posts.createIndex({downvotes: -1}, {background: true});
  Posts.createIndex({baseScore: -1}, {background: true});
  Posts.createIndex({score: -1}, {background: true});
  Posts.createIndex({upvoters: -1}, {background: true});
  Posts.createIndex({lastCommentedAt: -1}, {background: true});
  Posts.createIndex({sticky: -1, score: -1}, {background: true});
  Posts.createIndex({sticky: -1, postedAt: -1}, {background: true});
  Posts.createIndex({sticky: -1, baseScore: -1}, {background: true});
});

