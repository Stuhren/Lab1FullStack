//setting up the connection to MongoDB 
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const mongoDB = "CONNECTION_URL";
main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
}