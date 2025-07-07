const express = require("express");
const router = express.Router();

//index 
router.get("/",(req,res) => {
    res.send("Get for post");
});

//Show 
router.get("/:id",(req, res) => {
    res.send("Get for show post id");
});

//post 
router.post("/",(req, res) => {
    res.send("Post for post");
});

//Delete
router.post("/:id",(req, res) => {
    res.send("delete  for  posts id");
});
module.exports = router;