const express = require("express");
const router = express.Router();

//index route
router.get("/",(req,res) => {
    res.send("Get for users");
});

//Show users
router.get("/:id",(req, res) => {
    res.send("Get for show users id");
});

//post users
router.post("/",(req, res) => {
    res.send("Post for  users");
});

//Delete users
router.post("/:id",(req, res) => {
    res.send("delete  for  users id");
});

module.exports = router;