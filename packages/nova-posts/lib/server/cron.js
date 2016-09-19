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
      const scheduledPosts = Posts.find({isFuture: true}, {
        fields: {
          _id: 1,
          status: 1,
          postedAt: 1,
          userId: 1,
          title: 1
        }
      }).fetch();

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
  Posts._ensureIndex({createdAt: -1}, {background: true});
  Posts._ensureIndex({createdAt: 1}, {background: true});
  Posts._ensureIndex({postedAt: -1}, {background: true});
  Posts._ensureIndex({postedAt: 1}, {background: true});
  Posts._ensureIndex({commenters: -1}, {background: true});
  Posts._ensureIndex({userId: -1}, {background: true});
  Posts._ensureIndex({userId: 1}, {background: true});
  Posts._ensureIndex({isFuture: -1}, {background: true});
  Posts._ensureIndex({upvotes: -1}, {background: true});
  Posts._ensureIndex({downvotes: -1}, {background: true});
  Posts._ensureIndex({baseScore: -1}, {background: true});
  Posts._ensureIndex({score: -1}, {background: true});
  Posts._ensureIndex({upvoters: -1}, {background: true});
  Posts._ensureIndex({lastCommentedAt: -1}, {background: true});
  Posts._ensureIndex({lastCommentedAt: -1}, {background: true});
  Posts._ensureIndex({categories: -1}, {background: true});
  Posts._ensureIndex({sticky: -1, score: -1}, {background: true});
  Posts._ensureIndex({sticky: -1, postedAt: -1}, {background: true});
  Posts._ensureIndex({createdAt: -1, _id: -1}, {background: true});
  Posts._ensureIndex({createdAt: 1, _id: -1}, {background: true});
  Posts._ensureIndex({postedAt: -1, _id: -1}, {background: true});
  Posts._ensureIndex({postedAt: 1, _id: -1}, {background: true});
  Posts._ensureIndex({commenters: -1, _id: -1}, {background: true});
  Posts._ensureIndex({userId: -1, _id: -1}, {background: true});
  Posts._ensureIndex({userId: 1, _id: -1}, {background: true});
  Posts._ensureIndex({isFuture: -1, _id: -1}, {background: true});
  Posts._ensureIndex({upvotes: -1, _id: -1}, {background: true});
  Posts._ensureIndex({downvotes: -1, _id: -1}, {background: true});
  Posts._ensureIndex({baseScore: -1, _id: -1}, {background: true});
  Posts._ensureIndex({score: -1, _id: -1}, {background: true});
  Posts._ensureIndex({upvoters: -1, _id: -1}, {background: true});
  Posts._ensureIndex({lastCommentedAt: -1, _id: -1}, {background: true});
  Posts._ensureIndex({lastCommentedAt: -1, _id: -1}, {background: true});
  Posts._ensureIndex({categories: -1, _id: -1}, {background: true});
  Posts._ensureIndex({sticky: -1, score: -1, _id: -1}, {background: true});
  Posts._ensureIndex({sticky: -1, postedAt: -1, _id: -1}, {background: true});
  Posts._ensureIndex({sticky: -1, baseScore: -1, _id: -1}, {background: true});
});

