const express = require("express");
const app = express();
const users = require("./routes/user.js");
const posts = require("./routes/post.js");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const flash = require("connect-flash");
const path = require("path");


app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

  const sessionOptions = {
    secret:"mysupersecretcode",
     resave:false, 
     saveUninitialized: true};

app.use(session(sessionOptions));
app.use(flash());

app.use((req, res, next) => {
    res.locals.successMsg = req.flash("success");
        res.locals.errorMsg = req.flash("error");
        next();
});

    app.get("/register", (req, res) => {
    let { name = "anonymous" } = req.query;
    req.session.name = name;
    if(name === "anonymous"){
       req.flash("error", "user is not register!"); 
    }else{
    req.flash("success", "user register successfully!");
    }
    res.redirect("/hello");
    });


    app.get("/hello",(req, res) => {
        res.render("page.ejs",{ name: req.session.name });
    });




// app.get("/recount",(req, res) =>{
//     if(req.session.count){
//         req.session.count++;
//     }else{
//     req.session.count =1;
// }
//     res.send(`you send the request x  ${req.session.count} times`);
//})

// app.get("/test", (req, res) => {
//     res.send("test sucessfull");
// });


//  app.use(cookieParser("secretcode"));

// app.get("/getsignedcookies",(req, res) =>{
   
//     res.cookie("madeIn","india",{signed: true});
//     res.send("send a secrete cookies");
// });

// app.get("/verify", (req, res) => {
//     console.log(req.signedCookies);
//     res.send("verified");
// })

// app.get("/getcookies",(req, res) =>{
//     res.cookie("greet","namaste");
//     res.cookie("madeIn","india");
//     res.send("send you some cookie");
// });

// app.get("/greet", (req, res) => {
//     let {name = "anonymouse"} = req.cookies;
//     res.send(`Hi,${name}`)
// })

// app.get("/", (req, res) => {
//     console.dir(req.cookies);
//     res.send("hi, i am root");
// });

// app.use("/users", users);
// app.use("/posts", posts);





app.listen(3000, ()=> {
    console.log("server is listening to port 3000")
})