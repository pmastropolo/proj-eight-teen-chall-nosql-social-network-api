const { connect, connection } = require('mongoose');    // IMPORT MONGOOSE METHODS

const connectionString =                                // DEFINE DB CONNECTION STRING
  process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/social-network'; 
  
connect(connectionString);                              // INITIATE DB CONNECTION

module.exports = connection;                            // EXPORT DB CONNECTION


