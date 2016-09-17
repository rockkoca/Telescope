/**
 * Created by k on 9/17/16.
 */
import Telescope from 'meteor/nova:lib';
import Users from './collection.js';
/**
 * @summary viewHistory schema
 * @type {SimpleSchema}
 */
Telescope.schemas.viewHistory = new SimpleSchema({
  postId: {
    type: String
  },
  viewTime: {
    type: Date,
  },
  percent: {
    type: String,
    optional: true
  }
});


Users.addField({
  fieldName: 'telescope.viewHistory',
  fieldSchema: {
    type: [Telescope.schemas.viewHistory],
    optional: true,
    autoform: {
      omit: true
    }
  }
});

// import PublicationUtils from 'meteor/utilities:smart-publications';

// PublicationUtils.addToFields(Users.publishedFields.list, ["telescope.viewHistory"]);
