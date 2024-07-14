const express = require('express');
const router = express.Router();
const User = require('../models/User');
const path = require('path');
const {body, validationResult,} = require('express-validator');
const app = express();

// Express.js middleware to use JSON objects
app.use(express.json());

app.post('/user',
  // using validation to verify valid inputs (MIDDLEWARE)
  [
    [
      body("name",'Enter a valid name').notEmpty(),
      body("email",'Enter a valid email').isEmail(),
      body("password",'Password must be 5 character').isLength({ min: 5}),
    ],
  ],

  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

    res.status(200).json({success:'Successful Sign Up!'})
});

// Server Listening at port 3000
// const port = 3000;
// app.listen(port, () => {
//   console.log(`Listening at http://localhost:${port}`);
// });




module.exports = router;


 