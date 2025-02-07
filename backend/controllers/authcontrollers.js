const bcrypt= require("bcrypt")
const jwt = require("jsonwebtoken")
const path= require("path")
const fs= require('fs')
//const {authenticateToken}= require("../middleware/authenticate")
const User = require("../models/user.models")
const eventDetail= require("../models/event.model")
//const upload = require("../multer")

const createaccount = async(req,res)=>{
    const{fullName, email, password}= req.body;
    if(!fullName || !email || !password){
        return res.status(400).json({error:true,message: "Please fill in all fields."})
    }
    const isUser= await User.findOne({email})
    if(isUser){
        return res.status(400).json({error: "Email already exists."})
    }
    const hashedPassword= await bcrypt.hash(password,10);
    const user= new User({fullName, email, password:hashedPassword});
    await user.save()

    const accessToken= jwt.sign({
        userId:user._id },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '72h' }
    );
    return res.status(201).json({
        error:false,
        user:{fullName:user.fullName, email:user.email},
        accessToken,
        message:"Registration Successfull"
    })
}
const login= async(req,res)=>{
    const{email, password}= req.body;
    if(!email || !password){
        return res.status(400).json({message: "Email and password required."})
        }
        const user= await User.findOne({email})
        if(!user){
            return res.status(400).json({message: "Email not found."})
        }
        const isValidPassword= await bcrypt.compare(password,user.password);
        if(!isValidPassword){
            return res.status(400).json({message: "Invalid password."})
        }
        const accessToken= jwt.sign({
            userId:user._id },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '72h' }
        );
        return res.status(200).json({
            error:false,
            message:"Login Successful",
            user:{fullName:user.fullName, email:user.email},
            accessToken
        })
}
const getuser= async(req,res)=>{
    const {userId}= req.user
    const isuser= await User.findById(userId)
    if(!isuser){
        return res.status(400).json({message: "User not found."})
    }
    return res.status(200).json({
        user:isuser,
        message:"",
    })
}
const addevent= async(req,res)=>{
    const {title, description, imageUrl,date, time,location}= req.body;
    if(!title || !description || !imageUrl || !date || !time || !location){
        return res.status(400).json({message: "All fields are required."})
    }
    const validDate = new Date(date); // Converts string to Date object

    if (isNaN(validDate)) {
        return res.status(400).json({ message: "Invalid date format." });
    }
    try{
        const newEvent= new eventDetail({
            title, 
            description, 
            imageUrl,
            date:validDate, 
            time,
            location,
            creator: req.user.userId
        });
        await newEvent.save();
     res.status(201).json({event:newEvent, message:"added successfully"});
     }catch(err){
        res.status(400).json({message: "Error adding event.",error: err.message})
    }
}
const getevent= async(req,res)=>{
    const {userId}= req.user;

    try{
        const events = await eventDetail.find({creator: userId}).sort({date: -1});
        res.status(200).json({events, message: ""});
    }catch(err){
        res.status(400).json({message: "Error fetching events.",error: err.message})
    }
}
const imageupload= async(req,res)=>{
    try{
        if(!req.file){
            return res.status(400).json({message: "No file uploaded."})
        }
        const imageUrl = `${process.env.IMG_URL}/uploads/${req.file.filename}`;
        res.status(201).json({imageUrl, message: ""});
    }catch(err){
        res.status(400).json({message: "Error uploading image.",error: err.message})
    }

}
const deleteimage= async (req,res) => {
    const {imageUrl}= req.query;
    if(!imageUrl){
        return res.status(400).json({message: "No image URL provided."})
    }
    try{
        const filename= path.basename(imageUrl)
        const filePath = path.join(__dirname, `../uploads/${filename}`);

        if(fs.existsSync(filePath)){
            fs.unlinkSync(filePath);
            res.status(200).json({message:"image deleted successfully"})
        }else{
            res.status(404).json({message: "Image not found."})
        }
    }catch(err){
        res.status(400).json({message: "Error deleting image.",error: err.message})
    }
}
const editevent = async (req, res) => {
    const { id } = req.params;
    const { title, description,imageUrl, date, time, location } = req.body;
    const { userId } = req.user;
   if(!title || !description || !imageUrl ||!date || !time || !location  ){
    return res.status(400).json({message: "Please fill all the fields."})
   }
   try {
    const event = await eventDetail.findOne({_id:id, userId: userId});
    if (!event) {
        return res.status(404).json({ message: "Event not found." });
    }
    const placeholderUrl= 'http://localhost:5000/assets/Screenshot 2025-02-04 144331.png'
      
    event.title= title;
    event.description= description;
    event.imageUrl= imageUrl || placeholderUrl;
    event.date= date;
    event.time= time;
    event.location= location;
    await event.save();
    res.status(200).json({ message: "Event updated successfully." });
   }catch(err){
    res.status(400).json({message: "Error updating event.",error: err.message})
   }
}


module.exports= {
    createaccount,
    login,
    getuser,
    addevent,
    getevent,
    imageupload,
    deleteimage,
    editevent

}