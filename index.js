//MODULE IMPORT
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const session = require("express-session");
const flash = require("connect-flash")
const { SerialPort } = require('serialport')
const { ReadlineParser } = require('@serialport/parser-readline')
const port = new SerialPort({ path: 'COM3', baudRate: 9600 })
var cors = require('cors')

//--------------------------------------------------------------------------------------------------------------------------//


//CONSTANT DECLARATIONS
const encoder = bodyParser.urlencoded();
const app = express();
const port2 = 4500;
const mysql = require("./connection").con


//--------------------------------------------------------------------------------------------------------------------------//


//DECLARING STATIC FILES
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));
//app.set('view engine', "ejs");
app.set("view engine", "hbs");

app.use(session({
    secret: "KeyVaultX",
    cookie: { maxAge: 60000 },
    resave: false,
    saveUninitialized: false
}));
app.use(flash());
app.use(cors())
app.use(express.json())

//--------------------------------------------------------------------------------------------------------------------------//


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
    res.sendFile(path.join(__dirname + "/views/login.html")) 
});

app.get("/request", function (req, res) {
    res.render(path.join(__dirname + "/views/request"), { message: req.flash("message") })
});

app.get("/contact", function (req, res) {
    res.render(path.join(__dirname + "/views/contact"), { message: req.flash("message") })
});

app.get("/adashboard", function (req, res) {
    res.render(path.join(__dirname + "/views/admin_dashboard/admindashboard"))
});

app.get("/adashboard/allusers", function (req, res) {
    let qry = "select * from users";
    mysql.query(qry, (err, results) => {
        if (err) throw err
        else {
            res.render(path.join(__dirname + "/views/admin_dashboard/admindashboarduser"), { data: results })
        }
    });
});

app.get("/adashboard/admin", function (req, res) {
    let qry = "select * from admin";
    mysql.query(qry, (err, results) => {
        if (err) throw err
        else {
            res.render(path.join(__dirname + "/views/admin_dashboard/admindashboardadmin"), { data: results })
        }
    });
});

app.get("/adashboard/faculty", function (req, res) {
    let qry = "select * from faculty";
    mysql.query(qry, (err, results) => {
        if (err) throw err
        else {
            res.render(path.join(__dirname + "/views/admin_dashboard/admindashboardfaculty"), { data: results })
        }
    });
});

app.get("/adashboard/student", function (req, res) {
    let qry = "select * from student";
    mysql.query(qry, (err, results) => {
        if (err) throw err
        else {
            res.render(path.join(__dirname + "/views/admin_dashboard/admindashboardstudent"), { data: results })
        }
    });
});

app.get("/adashboard/rfidperm", function (req, res) {
    let qry = "select * from rfidperm";
    mysql.query(qry, (err, results) => {
        if (err) throw err
        else {
            res.render(path.join(__dirname + "/views/admin_dashboard/admindashboardrfidperm"), { data: results })
        }
    });
});



app.get("/adashboard/alerts", function (req, res) {
    let qry = "select * from alerts";
    mysql.query(qry, (err, results) => {
        if (err) throw err
        else {
            res.render(path.join(__dirname + "/views/admin_dashboard/admindashboardalerts"), { data: results })
        }
    });
});

app.get("/adashboard/vault", function (req, res) {
    let qry = "select * from vault";
    mysql.query(qry, (err, results) => {
        if (err) throw err
        else {
            res.render(path.join(__dirname + "/views/admin_dashboard/admindashboardvault"), { data: results })
        }
    });
});

app.get("/adashboard/addkeys", function (req, res) {
    res.render(path.join(__dirname + "/views/admin_dashboard/admindashboardaddkeys"))
});

app.get("/addkeys", function (req, res) {
    
    // fetching data from form
    const { id, name, department, position} = req.query

    // Sanitization XSS...
    let qry = "select * from allkey where id=? or name=?";
    mysql.query(qry, [id, name], (err, results) => {
        if (err)
            throw err
        else {

            if (results.length > 0) {
                res.render("add", { checkmesg: true })
            } else {

                // insert query
                let qry2 = "insert into allkey values(?,?,?,?)";
                mysql.query(qry2, [id, name, department, position], (err, results) => {
                    if (results.affectedRows > 0) {
                        res.render(path.join(__dirname + "/views/admin_dashboard/admindashboardaddkeys"), { mesg: true })
                    }
                })
            }
        }
    })
});

app.get("/adashboard/removekeys", function (req, res) {
    res.render(path.join(__dirname + "/views/admin_dashboard/admindashboardremovekeys"))

});
app.get("/removekeys", (req, res) => {

    const { position } = req.query;

    let qry = "delete from allkey where position=?";
    mysql.query(qry, [position], (err, results) => {
        if (err) throw err
        else {
            if (results.affectedRows > 0) {
                res.render(path.join(__dirname + "/views/admin_dashboard/admindashboardremovekeys"), { mesg1: true})
            } else {

                res.render(path.join(__dirname + "/views/admin_dashboard/admindashboardremovekeys"), { mesg1: false})

            }

        }
    });
});

app.get("/adashboard/viewkeys", function (req, res) {
    let qry = "select * from allkey";
    mysql.query(qry, (err, results) => {
        if (err) throw err
        else {
            res.render(path.join(__dirname + "/views/admin_dashboard/admindashboardviewkeys"), { data: results })
        }
    });
});

app.get("/adashboard/alltransactions", function (req, res) {
    let qry = "select * from alltransactions";
    mysql.query(qry, (err, results) => {
        if (err) throw err
        else {
            res.render(path.join(__dirname + "/views/admin_dashboard/admindashboardalltransactions"), { data: results })
        }
    });
});

app.get("/adashboard/keystaken", function (req, res) {
    let qry = "select * from keystaken";
    mysql.query(qry, (err, results) => {
        if (err) throw err
        else {
            res.render(path.join(__dirname + "/views/admin_dashboard/admindashboardkeystaken"), { data: results })
        }
    });
});

app.get("/adashboard/keysreturned", function (req, res) {
    let qry = "select * from keysreturned";
    mysql.query(qry, (err, results) => {
        if (err) throw err
        else {
            res.render(path.join(__dirname + "/views/admin_dashboard/admindashboardkeysreturned"), { data: results })
        }
    });
});

app.get("/adashboard/overdue", function (req, res) {
    let qry = "select * from overduekeys";
    mysql.query(qry, (err, results) => {
        if (err) throw err
        else {
            res.render(path.join(__dirname + "/views/admin_dashboard/admindashboardoverduekeys"), { data: results })
        }
    });
});

app.get("/adashboard/contact", function (req, res) {
    let qry = "select * from contactus";
    mysql.query(qry, (err, results) => {
        if (err) throw err
        else {
            res.render(path.join(__dirname + "/views/admin_dashboard/admindashboardcontact"), { data: results })
        }
    });
});

app.get("/adashboard/register", function (req, res) {
    let qry = "select * from request";
    mysql.query(qry, (err, results) => {
        if (err) throw err
        else {
            res.render(path.join(__dirname + "/views/admin_dashboard/admindashboardregister"), { data: results })
        }
    });
});

app.get("/vdashboard", function (req, res) {
    res.render(path.join(__dirname + "/views/view_dashboard/viewdashboard"))
});


app.get("/vdashboard/User", function (req, res) {

    let qry = "select * from admin";
    mysql.query(qry, (err, results) => {
        if (err) throw err
        else {
            res.render(path.join(__dirname + "/views/view_dashboard/viewdashboarduser"), { data: results })
        }
    });  
});

app.get("/vdashboard/Keys", function (req, res) {
    let qry = "select * from allkey";
    mysql.query(qry, (err, results) => {
        if (err) throw err
        else {
            res.render(path.join(__dirname + "/views/view_dashboard/viewdashboardkeys"), { data: results })
        }
    });
});

app.get("/vdashboard/Contact", function (req, res) {
    let qry = "select * from contactus";
    mysql.query(qry, (err, results) => {
        if (err) throw err
        else {
            res.render(path.join(__dirname + "/views/view_dashboard/viewdashboardcontact"), { data: results })
        }
    });
});




//--------------------------------------------------------------------------------------------------------------------------//


//AUTHENTICATION

var name='';
app.post("/login", encoder, function (req, res) {

    var email = req.body.email;
    var password = req.body.pass;
    var users = req.body.users;
    console.log(users, email, password);
   
    if (users === "Admin") {
        mysql.query("select * from admin where admin_email = ? and admin_password= ?", [email, password], function (err, results, fields) {
            if (results.length > 0) 
            {

                mysql.query("Select admin_name from admin where admin_email = ?", [email], function (err, results, fields) {
                    if (results.length > 0) {

                        console.log(results[0].admin_name);
                    }
            });
           res.redirect("/adashboard");
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
        mysql.query("select * from faculty where faculty_email = ? and faculty_password= ?", [email, password], function (err, results, fields) {
            if (results.length > 0) {

                name = mysql.query("select faculty_name from faculty where faculty_email=?", [email]);
                res.redirect("/vdashboard");
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
        mysql.query("select * from student where student_email = ? and v_password= ?", [email, password], function (err, results, fields) {
            if (results.length > 0) {

                res.redirect("/vdashboard");
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


//--------------------------------------------------------------------------------------------------------------------------//


//REQUEST FORM

app.post("/request", encoder, function (req, res) {

    var email = req.body.email;
    var name = req.body.name;
    var regno = req.body.regno;
    var user = req.body.users;
    var dept = req.body.depart;
    var post = req.body.post;
    var phno = req.body.phno;
    var pass = req.body.pass;
    console.log(user, regno, name, email, pass, dept, post, phno);

    let qry2 = "insert into request values(?,?,?,?,?,?,?,?)";
    mysql.query(qry2, [regno, user, name, dept, post, email, pass, phno], (err, results) => {
        req.flash("message", " Your Request is recorded successfully");
        res.redirect("/request");

    })

});

//--------------------------------------------------------------------------------------------------------------------------//


//CONTACT FORM INFO

app.post("/contact", encoder, function (req, res) {

    var email = req.body.email;
    var name = req.body.name;
    var regno = req.body.regno;
    var message = req.body.message;
    console.log(regno, name, email, message);

    let qry2 = "insert into contactus values(?,?,?,?)";
    mysql.query(qry2, [regno, name, email, message], (err, results) => {
        req.flash("message", " Your Response is recorded successfully");
        res.redirect("/contact");

    })

});

//--------------------------------------------------------------------------------------------------------------------------//


//RFID
const parser = port.pipe(new ReadlineParser({ delimiter: '\r' }));
parser.on('open', function () {
    console.log('connection is opened');
})

app.listen(5000, () => {
    console.log(" USB Server is up at 5000");
});

var num = 0;
var backr;

parser.on('data', function (data) {
    
    back=data
    var reg=0;
    var ldr=0;
    if (data.slice(-8,-6) != 22 || data.slice(-8,-6) != 22 )
    {
        ldr = Number(data.slice(-3));
    }
    else
    {
        reg = Number(back.slice(-8));
        backr=reg;
    }
    if(backr>0 && ldr>0)
    {

        console.log(backr)
        console.log(ldr)
        mysql.query("SELECT lvl from rfidperm where id = ?", [backr], function (err, results, fields) {
            if (results.length > 0) {

                console.log("User Authenticated");
                console.log(results[0].lvl);
                console.log("\n")


            }
            else {
                console.log("User Not Found")
                console.log("\n")

            }
        })
    }
});



parser.on('error', function (err) {
    console.log(err.message);
});


//--------------------------------------------------------------------------------------------------------------------------//


//PORT
app.listen(port2, (err) => {
    if (err)
        throw err
    else
        console.log("Server running at %d port", port2);
});


//--------------------------------------------------------------------------------------------------------------------------//

//VIEW DASHBOARD
