var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", function(req, res, next) {
  res.send("respond with a resource");
});

router.get("/watson", function(req, res, next) {
  const PersonalityInsightsV3 = require("ibm-watson/personality-insights/v3");

  const personalityInsights = new PersonalityInsightsV3({});

  const profileParams = {
    // Get the content from the JSON file.
    content: require("../profile.json"),
    content_type: "application/json",
    consumption_preferences: true,
    raw_scores: true
  };

  personalityInsights
    .profile(profileParams)
    .then(profile => {
      console.log(JSON.stringify(profile, null, 2));
    })
    .catch(err => {
      console.log("error:", err);
    });
  res.send("respond with a resource");
});
module.exports = router;
