const express = require('express')
const router= express.Router()
const {createaccount,login,getuser,addevent,getevent,imageupload,deleteimage,editevent,deletevent,geteventsearch}= require("../controllers/authcontrollers")
const {authenticateToken}= require("../middleware/authenticate")
const upload1= require("../multer")
//create account
router.post("/create-account",createaccount)

//login
router.post("/login",login)

//get user
router.get("/get-user", authenticateToken, getuser)
//add events
router.post("/add-event", authenticateToken,addevent )
//get all event
router.get("/get-event", authenticateToken, getevent)
//route to handle iamge upload
router.post("/image-upload", upload1.single("image"), imageupload);

// delete image
router.delete("/delete-image", deleteimage)

//edit event
router.put("/edit-event/:id", authenticateToken, editevent); 
//delete event
router.delete("/delete-event/:id", authenticateToken, deletevent);
//search event
router.get("/search-event", authenticateToken, geteventsearch);

module.exports= router;