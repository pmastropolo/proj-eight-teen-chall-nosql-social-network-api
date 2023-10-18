// Require schema and model from mongoose
const { Schema, model } = require('mongoose');

// USER SCHEMA
const UserSchema = new Schema({

        // USERNAME
        username: {
          type: String,               // DATA TYPE IS STRING
          unique: true,               // UNIQUE CONSTRAINT
          required: true,             // REQUIRED FIELD
          trim: true                  // TRIMS WHITESPACE
},

        // EMAIL
        email: {
          type: String,               // DATA TYPE IS STRING
          required: true,             // REQUIRED FIELD
          unique: true,               // UNIQUE CONSTRAINT
          match: [/.+\@.+\..+/, 'Must be a valid email address']        // VALIDATION FOR EMAIL FORMAT
},

        // THOUGHTS ARRAY WITH REFERENCES TO THOUGHT MODEL
        thoughts: [

          {
            type: Schema.Types.ObjectId, // USING OBJECTID DATA TYPE FROM MONGOOSE
            ref: 'Thought'               // REFERENCE TO THOUGHT MODEL
          }

        ],

        // FRIENDS ARRAY
        friends: [
          {
            type: Schema.Types.ObjectId, // USING OBJECTID DATA TYPE FROM MONGOOSE
            ref: 'User'                  // REFERENCE TO USER MODEL ITSELF
          }
        ]
      });
      

// VIRTUAL TO GET COUNT OF FRIENDS
UserSchema.virtual('friendCount').get(function() {
return this.friends.length; // RETURN NUMBER OF FRIENDS
 
});
      

const User = model('User', UserSchema); // CREATE USER MODEL FROM USER SCHEMA


module.exports = User;  // EXPORT USER