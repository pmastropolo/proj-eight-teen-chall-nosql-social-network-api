// IMPORT MONGOOSE'S SCHEMA AND MODEL
const { Schema, model } = require('mongoose');

// REACTION SCHEMA
const ReactionSchema = new Schema({

    // UNIQUE ID FOR REACTION
    reactionId: {
        type: Schema.Types.ObjectId,                 // USING OBJECTID DATA TYPE FROM MONGOOSE
        default: () => new mongoose.Types.ObjectId() // DEFAULTS TO NEW OBJECTID
    },

    // TEXT CONTENT OF REACTION
    reactionBody: {
        type: String,               // DATA TYPE IS STRING
        required: true,             // REQUIRED FIELD
        maxlength: 280              // MAX LENGTH CONSTRAINT
    },

    // USERNAME OF PERSON WHO MADE REACTION
    username: {
        type: String,               // DATA TYPE IS STRING
        required: true              // REQUIRED FIELD
    },

    // TIMESTAMP OF WHEN REACTION WAS CREATED
    createdAt: {
        type: Date,                                    // DATA TYPE IS DATE
        default: Date.now,                             // DEFAULTS TO CURRENT DATE AND TIME
        get: createdAtVal => dateFormat(createdAtVal)  // GETTER TO FORMAT TIMESTAMP
    }
});

// THOUGHT SCHEMA
const ThoughtSchema = new Schema({

    // TEXT CONTENT OF THOUGHT
    thoughtText: {
        type: String,               // DATA TYPE IS STRING
        required: true,             // REQUIRED FIELD
        minlength: 1,               // MIN LENGTH CONSTRAINT
        maxlength: 280              // MAX LENGTH CONSTRAINT
    },

    // TIMESTAMP OF WHEN THOUGHT WAS CREATED
    createdAt: {
        type: Date,                                    // DATA TYPE IS DATE
        default: Date.now,                             // DEFAULTS CURRENT DATE/TIME
        get: createdAtVal => dateFormat(createdAtVal)  // GETTER TO FORMAT TIMESTAMP
    },

    // USERNAME OF PERSON WHO MADE THOUGHT
    username: {
        type: String,               // DATA TYPE IS STRING
        required: true              // REQUIRED FIELD
    },

    // ARRAY OF REACTIONS ON THOUGHT
    reactions: [ReactionSchema]      // NESTED DOCUMENT USING REACTION SCHEMA
});


// VIRTUAL TO GET COUNT OF REACTIONS
ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;       // RETURN NUMBER OF REACTIONS
});



const Thought = model('Thought', ThoughtSchema); // CREATE THOUGHT MODEL FROM THOUGHT SCHEMA


module.exports = Thought;       // EXPORT THOUGHT MODEL