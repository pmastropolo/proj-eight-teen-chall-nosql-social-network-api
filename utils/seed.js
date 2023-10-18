const { User, Thought } = require('../models');                             // IMPORT USER AND THOUGHT MODELS
const { users, thoughts } = require('./data');                              // IMPORT SEED DATA FOR USERS AND THOUGHTS
require('../config/connection');                                           // CONNECT TO THE DATABASE

const seedDatabase = async () => {                                         
    try {                                                                 
        await User.deleteMany({});                                         // DELETE ALL USERS FROM DATABASE
        await Thought.deleteMany({});                                      // DELETE ALL THOUGHTS FROM DATABASE

        const createdUsers = await User.insertMany(users);                 // INSERT SEED USERS INTO DATABASE

        for (let i = 0; i < thoughts.length; i++) {                       
            thoughts[i].userId = createdUsers[Math.floor(Math.random() * createdUsers.length)]._id;  // ASSIGN RANDOM USER ID TO EACH THOUGHT
        }

        await Thought.insertMany(thoughts);                                // INSERT SEED THOUGHTS INTO DATABASE

        console.log('Database seeded!');                                   // CONFIRM DATABASE SEEDING SUCCESS
        process.exit(0);                                                   // EXIT PROCESS SUCCESSFULLY

    } catch (err) {                                                        // HANDLE ERRORS
        console.error(err);                                                // LOG ERROR
        process.exit(1);                                                   // EXIT PROCESS WITH ERROR
    }
};

seedDatabase();                                                           // EXECUTE DATABASE SEED FUNCTION
