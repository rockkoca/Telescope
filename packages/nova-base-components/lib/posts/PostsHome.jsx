import Telescope from 'meteor/nova:lib';
import LastListLimit from 'meteor/nova:lib';
import React, { PropTypes, Component } from 'react';
import { ListContainer, DocumentContainer } from "meteor/utilities:react-list-container";
import Posts from "meteor/nova:posts";

class PostsHome extends Component {

  getDefaultView() {
    return {view: 'top'}
  }
  
  render() {

    const params = {...this.getDefaultView(), ...this.props.location.query, listId: "posts.list.main"};
    const {selector, options} = Posts.parameters.get(params);
    // console.log(selector);
    // console.log(options);
    // console.log(params);
    // console.log(Posts.getJoins());
    return (
      <ListContainer 
        collection={Posts} 
        publication="posts.list"
        selector={selector}
        options={options}
        terms={params} 
        joins={Posts.getJoins()}
        component={Telescope.components.PostsList}
        cacheSubscription={true}
        listId={params.listId}
        //{/*limit={Telescope.settings.get("postsPerPage", 10)}*/}
        limit={LastListLimit.get(params)}
      />
    )
  }
};

module.exports = PostsHome;