const express = require('express');
const router = express.Router();

const { restauraunt_rankings } = require("../utils/loss_function");
const restaurants = require("../data/restauraunts.json");


router.get("/restaurants", function (req, res) {
    // const result = restauraunt_rankings();
    const result = restaurants.data;
    res.status(200);
    res.send(result);
});

router.get("/restaurants/:restaurantId", (req, res) => {
    try {
        const { restaurantId } = req.params;
        const restaurantList = restaurants.data;
        const restaurant = restaurantList.filter((restaurant) => {
        return (
            restaurant.restaurant_id === parseInt(restaurantId)
        );
        });

        res.status(200);
        res.send({ restaurant })
    } catch (err) {
        res.send(err);
    }
});

module.exports = router;