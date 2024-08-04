const express = require('express');
const router = express.Router();
const User = require('../models/User');
const path = require('path');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');


const JWT_SECRET = 'Mynameis@sardar';

// Express.js middleware to use JSON objects
const app = express();
app.use(express.json());


//ROUTE:1 ,Create a user using: "/auth/user". NO LOGIN REQUIRED
router.post('/user',
  // using validation to verify valid inputs (MIDDLEWARE)
  [
    body("name", 'Enter a valid name').notEmpty(),
    body("email", 'Enter a valid email').isEmail(),
    body("password", 'Password must be 5 characters').isLength({ min: 5 })
  ],

  async (req, res) => {
    let success = false;

    //if there are errors, return bad request and the errors
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }

    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({ success, error: "User with this email already exists" });
      }
      
    //for security purpose use salt and hash
      const salt = await bcrypt.genSalt(10);
      const secPassword = await bcrypt.hash(req.body.password, salt);

      // create a new user
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPassword
      });

      const data = {
        user:{
          id: user.id
        }
      }

      const authtoken = jwt.sign(data, JWT_SECRET);

      success = true;
      res.status(200).json({success, authtoken});

    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);


//ROUTE:2 ,Create a user using: "/auth/login". NO LOGIN REQUIRED
router.post('/login',[

  // using validation to verify valid inputs (MIDDLEWARE)
    body("email", 'Enter a valid email').isEmail(),
    body("password", 'Password must be 5 characters').isLength({ min: 5 })

], async (req, res) => {

  let success = false; // because we are changing the success

  //if there are errors, return bad request and the errors
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {email,password} = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) {
      success = false
      return res.status(400).json({ error: "Please try to login correctly" });
    }
  const passwordCompare = bcrypt.compare(password, user.password);
  if (!passwordCompare){
    success = false
    return res.status(400).json({success, error: "Please try to login correctly" });
  }
  const data = {
    user: {
      id: user.id
    }
  }
  const authtoken = jwt.sign(data, JWT_SECRET);
  success = true;
  res.status(200).json({success, authtoken});

} catch (error) {
  console.error(error.message);
  res.status(500).send("Internal Server Error");
}

});

//ROUTE:3 ,Create a user using: "/auth/getuser".LOGIN REQUIRED

router.post('/getuser',fetchuser,  async (req, res) => {
  
try{
  userId = req.user.id;
  let user = await User.findById(userId).select("-password");
   res.send(user);
  // res.send(`Hello user with ID: ${req.user.id}`);
}catch (error){

  console.error(error.message);
  res.status(500).send("Internal Server Error");
}
});


module.exports = router;
