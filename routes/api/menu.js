const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");

const User = require("../../models/User");
const Menu = require("../../models/Menu");

// Create new menu item
router.post(
  "/",
  [
    auth,
    [
      body("name", "Please include the name of the item.").not().isEmpty(),
      body("description", "Please include the description of the item.")
        .not()
        .isEmpty(),
      body("category", "Please include the category in which the item belongs.")
        .not()
        .isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select("-password");
      const admin = user.isAdmin;

      const {
        name,
        description,
        category,
        cost,
        smallCost,
        mediumCost,
        largeCost,
        smallCalories,
        mediumCalories,
        largeCalories,
      } = req.body;

      const newMenu = new Menu({
        name,
        description,
        category,
        cost,
        smallCost,
        mediumCost,
        largeCost,
        smallCalories,
        mediumCalories,
        largeCalories,
      });

      const menuItem = await newMenu.save();

      res.json(menuItem);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// Get menu items
router.get("/", async (req, res) => {
  try {
    const menuItems = await Menu.find();
    res.json(menuItems);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// Delete menu item
router.delete("/:id", auth, async (req, res) => {
  try {
    const menuItem = await Menu.findById(req.params.id);
    const user = await User.findById(req.user.id).select("-password");

    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/) || !menuItem) {
      return res.status(404).json({ msg: "The item is not found." });
    }

    if (!user.isAdmin) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    await menuItem.remove();

    res.json({ msg: "Item has been removed successfully." });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
