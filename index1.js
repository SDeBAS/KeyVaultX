
//app.use(express.static(__dirname + './login'));
app.use('*/images', express.static('public'));
//app.use( express.static(path.join(__dirname, 'public/images')));




/*

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname + "/home/index.html"))
});

app.get("/login",function(req,res){
    res.sendFile(path.join(__dirname+"/login/login.html"))
});

app.post("/",encoder,function(req,res){

    var email=req.body.email;
    var password=req.body.pass;
    var role = req.body.member_level;
    if(role="admin")
    {
        connection.query("select * from admin where admin_email = ? and admin_password= ?", [email, password], function (err, results, fields) {
            if (results.length > 0) {
                res.redirect("/dashboard");
                console.log(role, email, password);
            }
            else {
                res.redirect("/");
                console.log(role, email, password);
                console.log("Invalid credentials");
            }
            res.end();
        })
    }
    else if(role="faculty")
    {
        connection.query("select * from faculty where faculty_email = ? and faculty_password= ?", [email, password], function (err, results, fields) {
            if (results.length > 0) {
                res.redirect("/dashboard");
                console.log(role, email, password);
            }
            else {
                res.redirect("/");
                console.log(role, email, password);
                console.log("Invalid credentials");
            }
            res.end();
        })
    }
    else if(role="student")
        {
            connection.query("select * from student where student_email = ? and student_password= ?", [email, password], function (err, results, fields) {
                if (results.length > 0) {
                    res.redirect("/dashboard");
                    console.log(role, email, password);
                }
                else {
                    res.redirect("/");
                    console.log(role, email, password);
                    console.log("Invalid credentials");
                }
                res.end();
            })
        }
    
});

app.get("/dashboard",function(req,res){
    res.sendFile(path.join(__dirname + "/dashboard/dashboard.html"));
});

*/
