var express = require("express");
var router = express.Router();
require("dotenv").config();

var mongoConn = require("./mongoconn");

/* GET users listing. */
// router.get("/", function(req, res, next) {
//   res.send("respond with a resource");
// });

router.get("/", function(req, res, next) {});

router.get("/write", function(req, res, next) {
  res.render("watson/writeform");
});

router.post("/write", function(req, res, next) {
  // var cvletter = {
  //   subject: req.body.subject,
  //   content: req.body.content
  // };

  // const PersonalityInsightsV3 = require("ibm-watson/personality-insights/v3");

  // const personalityInsights = new PersonalityInsightsV3({
  //   version: process.env.WATSON_VERSION,
  //   username: process.env.WATSON_USERNAME,
  //   password: process.env.WATSON_PASSWORD,
  //   url: process.env.WATSON_URL
  // });

  // var profileParams = {
  //   content: cvletter,
  //   content_type: "text/plain",
  //   content_language: "ko",
  //   consumption_preferences: true,
  //   raw_scores: true
  // };

  // personalityInsights
  //   .profile(profileParams)
  //   .then(profile => {
  //     mongoConn(mongoSave(profile));
  //   })
  //   .catch(err => {
  //     console.log("error:", err);
  //   });

  var cvletter = {
    subject: req.body.subject,
    content: require("../resultSample.json")
  };

  const mongoSave = function(cvletter) {
    return function(err, client) {
      const db = client.db(process.env.MONGO_DB);
      const col = db.collection("watson");
      col.insertOne(cvletter, function(err, r) {
        client.close();
      });
    };
  };

  mongoConn(mongoSave(cvletter));

  // var WatsonSchema = mongoose.model("watson", cvletter);
  // WatsonSchema.save(function(err, WatsonSchema) {
  //   if (err) return console.error(err);
  //   console.dir(WatsonSchema);
  // });

  // mongoConn(function(err, db) {
  //   if (err) throw err;
  //   // console.log('aaa');
  //   var dbo = db.db("cvpi");
  //   // dbo.collection("piresult").find({}, { result_seq:1 }).toArray(function(err, result) {
  //   dbo
  //     .collection("piresult")
  //     .findOne({ result_seq: 1 }, function(err, result) {
  //       if (err) throw err;
  //       else {
  //         graphData = {
  //           name: "test",
  //           personality: [],
  //           needs: [],
  //           values: []
  //         };
  //         for (var big5Personal of result.data.personality) {
  //           graphData.personality.push({
  //             name: personalNames[big5Personal.name].toString("utf8"),
  //             percentile: big5Personal.percentile
  //           });
  //         }
  //         for (var need of result.data.needs) {
  //           graphData.needs.push({
  //             name: personalNames[need.name].toString("utf8"),
  //             percentile: need.percentile
  //           });
  //         }
  //         for (var value of result.data.values) {
  //           graphData.values.push({
  //             name: personalNames[value.name].toString("utf8"),
  //             percentile: value.percentile
  //           });
  //         }
  //         graphData.modelName = {
  //           personality: personalNames.personality.toString("utf8"),
  //           needs: personalNames.needs.toString("utf8"),
  //           values: personalNames.values.toString("utf8")
  //         };
  //         res.json({ data: graphData });
  //       }
  //       db.close();
  //     });
  // });

  // const personalityInsights = new PersonalityInsightsV3({
  //   version: process.env.WATSON_VERSION,
  //   username: process.env.WATSON_USERNAME,
  //   password: process.env.WATSON_PASSWORD,
  //   url: process.env.WATSON_URL
  // });

  // const profileParams = {
  //   // Get the content from the JSON file.
  //   content: require("../profile.json"),
  //   content_type: "application/json",
  //   consumption_preferences: true,
  //   raw_scores: true
  // };

  // personalityInsights
  //   .profile(profileParams)
  //   .then(profile => {
  //     console.log(JSON.stringify(profile, null, 2));
  //   })
  //   .catch(err => {
  //     console.log("error:", err);
  //   });
  res.redirect("/");
});
module.exports = router;
