const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");

const User = require("../../models/User");

// Get user
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
   
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// Login 
router.post(
  "/",
  [
    body("email", "Please enter a valid email").not().isEmpty(),
    body("password", "Please enter your password").exists(),
  ],
  async (req, res) => {
      const errors = validationResult(req);
      if(!errors.isEmpty()){
          return res.status(400).json({ errors: errors.array() })

      }

      const { email, password } = req.body;
      
    try {

      const user = await User.findOne({ email });

      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentials" }] });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentials" }] });
      }

      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 3600 },
        (err, token) => {
          if (err) throw err;
          res.send({token});
        }
      );
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server error')
    }
  }
);

module.exports = router;