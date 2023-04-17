const mysql = require("mysql");

const connection = mysql.createPool({
    connectionLimit: 100, //important
    multipleStatements : true,
    host: "localhost",
    user: "root",
    password: "debanjan",
    database: "keyvaultx"
});

//connect to database

connection.getConnection(function (error) {
    if (error) {
        throw error;
    }
    else {
        console.log("Succesfully connected to Database");
    }
})

module.exports.con = connection;