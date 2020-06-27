// Import all the env variables before the app begins
require("dotenv").config();

// Import app from app
const app = require("./app");
require("./database.js");

// Server is listening
const main = async () => {
  await app.listen(4000);
  console.log("Server is listening on port 4000");
};

main();
