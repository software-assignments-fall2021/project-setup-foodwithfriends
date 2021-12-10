const express = require('express');
const router = express.Router();
const Group = require("../models/group");

router.post("/cuisine", function (req, res) {

    const groupId = req.body.groupId;
    const cuisine = req.body.choice;
    const friend = req.body.name;

    Group.findOne({groupId: groupId}, (err, group) => {

        if (err) {
            console.log("Something wrong when finding the group");
            res.status(500);
            res.send(err);
            return;
        }

        const count = group.selectedCuisines.find((selectedCuisine) => {return cuisine == selectedCuisine.cuisine});

        let newSelectedCuisines = [...group.selectedCuisines];

        if (count) {
            newSelectedCuisines.forEach((selectedCuisine) => {
                if (selectedCuisine.cuisine === cuisine) {
                    selectedCuisine.votes += 1;
                }
            })
        }

        else {
            newSelectedCuisines.push({cuisine: cuisine, votes: 1 });
        }

        group.selectedCuisines = newSelectedCuisines;
        group.waitCount = group.waitCount + 1;
        group.currWaitFriends.push(friend);

        group.save((err, success) => {
            res.status(200);
            res.send({valid: true});
        });

    });
});

module.exports = router;
