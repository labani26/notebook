const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Notes = require('../models/Notes');
const { body, validationResult } = require('express-validator');

// ROUTE:1 Get all the notes using: GET "/note/fetchallnotes". LOGIN REQUIRED
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

// ROUTE:2 Add a new note using: POST "/note/addnote". LOGIN REQUIRED
router.post('/addnote', fetchuser, [
    body("title", 'Enter a valid title').isLength({ min: 3 }),
    body("description", 'Description must be at least 5 characters').isLength({ min: 5 })
], async (req, res) => {
    // If there are errors, return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { title, description, tag } = req.body;
        const notes = new Notes({
            title, description, tag, user: req.user.id
        });
        const savedNote = await notes.save();
        res.json(savedNote);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});


// ROUTE:3 Add a new note using: POST "/note/updatenote". LOGIN REQUIRED
router.put('/updatenote/:id', fetchuser, async (req, res) => {
  const {title, description, tag} = req.body;
  
  try {
  //create a newNote object
  const newNote = {};

  if(title){newNote.title = title};
  if(description){newNote.description = description};
  if(tag){newNote.tag = tag};
   
 

  //Find the note to be updated and update it
  let notes = await Notes.findById(req.params.id);
  if(!notes) {return res.status(404).send("Not Found")}
  
  if (notes.user.toString() !== req.user.id) {
    return res.status(401).send("Not Allowed")
  }

  notes = await Notes.findByIdAndUpdate(req.params.id, {$set: newNote}, {new: true})
  res.json({notes});

}catch(error){
    console.error(error.message);
    res.status(500).send("Internal Server Error");
}

});


// ROUTE:4 Delete a new note using: POST "/note/deletenote". LOGIN REQUIRED
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    const {title, description, tag} = req.body;

    try{

    //Find the note to be deleted and delete it
    let notes = await Notes.findById(req.params.id);
    if(!notes) {return res.status(404).send("Not Found")}
    

    //Allow deletion if only user owns this Note
    if (notes.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed")
    }
  
    notes = await Notes.findByIdAndDelete(req.params.id)
    res.json({"success": "Note has been deleted", notes: notes});

   }catch (error){
    console.error(error.message);
    res.status(500).send("Internal Server Error");
   }
  
  });






module.exports = router;
