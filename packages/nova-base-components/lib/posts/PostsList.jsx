import Telescope from 'meteor/nova:lib';
import React from 'react';

const PostsList = ({results, currentUser, hasMore, ready, count, totalCount, loadMore, showHeader = true}) => {

    // console.log('count');
    // console.log(count);
    // console.log(results);
    // update the page limit, if users clicked load more.
    // if we do not update it, the page limit will reset when the user go back to post list.

    Telescope.plus.LastListLimit.set(count);
    if (!!results.length) {
        return (
            <div className="posts-list">
                {showHeader ? <Telescope.components.PostsListHeader /> : null}
                <div className="posts-list-content">
                    {results.map(post => <Telescope.components.PostsItem post={post} currentUser={currentUser}
                                                                         key={post._id}/>)}
                </div>
                {hasMore ? (ready ?
                    <Telescope.components.PostsLoadMore loadMore={loadMore} count={count} totalCount={totalCount}/> :
                    <Telescope.components.PostsLoading/>) : <Telescope.components.PostsNoMore/>}
            </div>
        )
    } else if (!ready) {
        return (
            <div className="posts-list">
                {showHeader ? <Telescope.components.PostsListHeader /> : null}
                <div className="posts-list-content">
                    <Telescope.components.PostsLoading/>
                </div>
            </div>
        )
    } else {
        return (
            <div className="posts-list">
                {showHeader ? <Telescope.components.PostsListHeader /> : null}
                <div className="posts-list-content">
                    <Telescope.components.PostsNoResults/>
                </div>
            </div>
        )
    }

};

PostsList.displayName = "PostsList";

module.exports = PostsList;