// Import the module to connect the DB
const mongoose = require("mongoose");

// Save the address of the DB and control it
const URI = process.env.MONGODB_URI ? process.env.MONGODB_URI : "mongodb://localhost/dbtest";

// Set the connection
mongoose.connect(URI, {
    useNewUrlParser: true,
    useCreateIndex: true
});

// Listen the connection
const connection = mongoose.connection;

connection.once('open', () => {
    console.log("DB is connected");
});

