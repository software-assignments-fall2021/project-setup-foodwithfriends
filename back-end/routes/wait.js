const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Group = require("../models/group");
const { query, validationResult } = require("express-validator");

router.get("/wait", query("groupId").isString(), function (req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const groupId = req.query.groupId;

  Group.findOne({ groupId: groupId }, (err, doc) => {
    if (err) {
      console.log("Something wrong when finding the data");
      res.status(500);
      res.send(err);
      return;
    }

    User.find({ _id: doc.friends }, (err, userDoc) => {
      if (err) {
        console.log("Something wrong when finding the data");
        res.status(500);
        res.send(err);
        return;
      }
      const friends_array = userDoc;
      const number_users = doc.friends.length;
      const total_users = doc.numOfFriends;
      res.status(200);
      res.send({
        num_users: number_users,
        tot_users: total_users,
        friends: friends_array,
      });
      return;
    });
  });
});

module.exports = router;
