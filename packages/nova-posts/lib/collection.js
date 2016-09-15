const PostsStub = {
  helpers: x => x
}

/* we need to handle two scenarios: when the package is called as a Meteor package,
and when it's called as a NPM package */
const Posts = typeof Mongo !== "undefined" ? new Mongo.Collection("posts") : PostsStub;
const PostsBody = typeof Mongo !== "undefined" ? new Mongo.Collection("postsBody") : PostsBodyStub;


export default Posts;
export default PostsBody;

