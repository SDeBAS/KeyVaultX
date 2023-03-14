const mysql = require("mysql");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "123456",
    database: "keyvaultx"
});

//connect to database

connection.connect(function (error) {
    if (error) {
        throw error;
    }
    else {
        console.log("Succesfully connected to Database");
    }
})

module.exports.con = connection;