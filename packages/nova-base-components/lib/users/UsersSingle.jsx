import Telescope from 'meteor/nova:lib';
import React from 'react';
import { DocumentContainer } from "meteor/utilities:react-list-container";
import Users from 'meteor/nova:users';

const UsersSingle = (props, context) => {
  console.log(props);
  let component = Telescope.components.UsersProfile;
  if(props.params.option === 'commented') {
    component = Telescope.components.UsersCommented;
  }
  return (
    <DocumentContainer
      collection={Users}
      publication="users.single"
      selector={{'telescope.slug': props.params.slug}}
      terms={{'telescope.slug': props.params.slug}}
      component={component}
      documentPropName="user"
    />
  )
};

UsersSingle.displayName = "UsersSingle";

module.exports = UsersSingle;