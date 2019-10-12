module.exports = function(callback) {
  var MongoClient = require("mongodb").MongoClient;
  var mongourl =
    "mongodb://" +
    process.env.MONGO_USER +
    ":" +
    process.env.MONGO_PW +
    "@" +
    process.env.MONGO_HOST +
    "/" +
    process.env.MONGO_DB;
  mClient = MongoClient(mongourl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  mClient.connect(callback);
};
