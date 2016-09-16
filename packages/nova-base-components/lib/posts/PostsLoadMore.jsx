import React from 'react';
import { FormattedMessage } from 'react-intl';
import { LastListLimit} from 'meteor/nova:lib';

const PostsLoadMore = ({loadMore, count, totalCount}) => {
    console.log(loadMore);
    console.log('loadMore');
  return (
    <a className="posts-load-more" onClick={loadMore}>
      <span><FormattedMessage id="posts.load_more"/></span>
      &nbsp;
      {totalCount ? <span className="load-more-count">{`(${count}/${totalCount})`}</span> : null}
    </a>
  )
}

PostsLoadMore.displayName = "PostsLoadMore";

module.exports = PostsLoadMore;