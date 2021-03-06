const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Group = require("../models/group");
const { body, validationResult } = require("express-validator");

router.post(
  "/user",
  body("userName").isString(),
  body("groupID").isString(),
  function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const name = req.body.userName;
    const id = req.body.groupID;
    const newUser = new User({ groupId: id, name: name, dishPreferences: [] });

    newUser.save((err, result) => {
      if (err) {
        res.status(500);
        res.send({ success: false });
        return;
      }
      Group.findOneAndUpdate(
        { groupId: id },
        { $addToSet: { friends: newUser } },
        { new: true },
        (err, doc) => {
          if (err) {
            res.status(500);
            res.send({ success: false });
            return;
          }
          res.status(200);
          res.send({ success: true, userID: result._id });
        }
      );
    });
  }
);

module.exports = router;
