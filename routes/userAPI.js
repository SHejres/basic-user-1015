const { application } = require("express");
var express = require("express");
const multer = require("multer");
const path = require("path");

var mySql = require("mysql");
const cors = require("cors");
const bodyParser = require('body-parser');

var router = express.Router();

// database connection settings
var db =  mySql.createConnection({
    host:"127.0.0.1",
    user:"MySqlDB",
    password:"myP@sswrd",
    database:"testdb"
})

//test API
router.get("/",function(req,res,next){
    res.send("API is working properly");
});

//get all the users from the DB
router.get("/users", function(req,res){
    const q = "SELECT *, DATE_FORMAT(FROM_DAYS(DATEDIFF(NOW(),DOB)), '%Y') + 0 AS age FROM user where isActive =1";
    db.query(q,(err,data)=>{
        if(err) return res.json("not working");
        return res.json(data);
    })
});

//get all the countries from the DB
router.get("/country", function(req,res){
    const q = "SELECT * FROM country";
    db.query(q,(err,data)=>{
        if(err) return res.json("not working");
        return res.json(data);
    })
});



//get a user from the DB by id
router.get("/user/:id", function(req, res){
    const userId = req.params.id;
    const q = "SELECT name,email,DOB,photo,country_id FROM user WHERE  id = ? ";

   db.query (q, [userId], (err, data)=>{
    if(err) return res.json("failure");
    return res.json(data);
   })
}) 

// upload image API 
//where to store the images and what will the name be 
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null,'images') 
    },
    filename: (req, file,  cb ) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})
 
const upload = multer({
    storage: storage,
    limits: {fileSize: '1000000'}, // 1KB
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png/
        const mimeType = fileTypes.test(file.mimetype)
        const extName = fileTypes.test(path.extname(file.originalname))

        if(mimeType && extName){
            return cb(null, true)
        }
        cb("Give image type file to upload ")
    }

}).single('photo') // tag name in the front end 


//insert a new user recored to the DB, use uplad function to uupload the selected image in the images folder
router.post("/addUser",upload, function(req, res){
    const q = "INSERT INTO user( name, email, DOB, photo, country_id, isActive)  VALUES (?)";
	const values = [ 
        req.body.name,
        req.body.email,
        req.body.DOB,
        req.file.path,
        req.body.country_id,
        1
        ];
   db.query (q, [values], (err, data)=>{
    if(err) return res.json("failure");
    return res.json("success");
   })
}) 

//soft delete the user by updating the isActive recored
router.put("/deleteUser/:id", function(req, res){
    const userId = req.params.id;
    const q = "UPDATE user SET isActive=0 WHERE  id = ? ";

   db.query (q, [userId], (err, data)=>{
    if(err) return res.json("failure");
    return res.json("success");
   })
}) 

//update existing user recored
router.put("/updateUser/:id",upload, function(req, res){
    const userId = req.params.id;
    const q = "UPDATE user SET `name`=?, `email`=?, `DOB`=?, `photo`=?, `country_id`= ? WHERE  id = ? ";
    const values = [
        req.body.name,
        req.body.email,
        req.body.DOB,
        req.file.path,
        req.body.country_id
    ]

   db.query (q, [...values,userId], (err, data)=>{
    if(err) return res.json(err);
    return res.json("success");
   })
}) 

module.exports= router;