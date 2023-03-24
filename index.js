//MODULE IMPORT
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const session=require("express-session");
const flash=require("connect-flash")

//CONSTANT DECLARATIONS
const encoder = bodyParser.urlencoded();
const app = express();
const port = 4500;
const mysql = require("./connection").con

//DECLARING STATIC FILES
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(session({
    secret : "KeyVaultX",
    cookie : {maxAge: 60000},
    resave : false,
    saveUninitialized: false
}));
app.use(flash());


//LINKS
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname + "/views/pindex.html"))
});

app.get("/home", function (req, res) {
    res.sendFile(path.join(__dirname + "/views/index.html"))
});

app.get("/about", function (req, res) {
    res.sendFile(path.join(__dirname + "/views/about.html"))
});

app.get("/team", function (req, res) {
    res.sendFile(path.join(__dirname + "/views/team.html"))
});

app.get("/features", function (req, res) {
    res.sendFile(path.join(__dirname + "/views/features.html"))
});

app.get("/login", function (req, res) {
    res.render(path.join(__dirname + "/views/login"))
});

app.get("/request", function (req, res) {
    res.render(path.join(__dirname + "/views/request"), { message: req.flash("message") })
});

app.get("/contact", function (req, res) {
    res.render(path.join(__dirname + "/views/contact"),{ message : req.flash("message")})
});

    app.get("/dashboard", function (req, res) {
        res.sendFile(path.join(__dirname + "/views/dashboard.html"))
    });



//AUTHENTICATION

app.post("/login", encoder, function (req, res) {

    var email = req.body.email;
    var password = req.body.pass;
    var users = req.body.users;
    console.log(users,email,password);
    if(users==="Admin")
    {
        mysql.query("select * from admin where email = ? and password= ?", [email, password], function (err, results, fields) {
            if (results.length > 0) {

                res.redirect("/dashboard");
                console.log(email, password, users);
            }
            else {
                res.redirect("/login");
                console.log(email, password, users);
                console.log("Invalid credentials");
            }
            res.end();
        })
    }
    else if (users === "Faculty") {
        mysql.query("select * from faculty where email = ? and password= ?", [email, password], function (err, results, fields) {
            if (results.length > 0) {

                res.redirect("/dashboard");
                console.log(email, password, users);
            }
            else {
                res.redirect("/login");
                console.log(email, password, users);
                console.log("Invalid credentials");
            }
            res.end();
        })
    }
    else if (users === "Student") {
        mysql.query("select * from student where email = ? and password= ?", [email, password], function (err, results, fields) {
            if (results.length > 0) {

                res.redirect("/dashboard");
                console.log(email, password, users);
            }
            else {
                res.redirect("/login");
                console.log(email, password, users);
                console.log("Invalid credentials");
            }
            res.end();
        })
    }
});


//REQUEST FORM

app.post("/request", encoder, function (req, res) {

    var email = req.body.email;
    var name = req.body.name;
    var regno = req.body.regno;
    var user = req.body.users;
    var dept = req.body.depart;
    var post=req.body.post;
    var phno=req.body.phno;
    var pass = req.body.pass;
    console.log(user,regno, name, email,pass,dept,post,phno);

    let qry2 = "insert into request values(?,?,?,?,?,?,?,?)";
    mysql.query(qry2, [regno, user,name,dept,post, email,pass,phno], (err, results) => {
        req.flash("message", " Your Request is recorded successfully");
        res.redirect("/request");

    })

});


//CONTACT FORM INFO

app.post("/contact", encoder, function (req, res) {

    var email = req.body.email;
    var name = req.body.name;
    var regno = req.body.regno;
    var message=req.body.message;
    console.log(regno, name, email, message);

    let qry2 = "insert into contactus values(?,?,?,?)";
    mysql.query(qry2, [regno,name,email, message], (err, results) => {
        req.flash("message", " Your Response is recorded successfully");
        res.redirect("/contact");

    })
    
});




//PORT
app.listen(port, (err) => {
    if (err)
        throw err
    else
        console.log("Server running at %d port", port);
});