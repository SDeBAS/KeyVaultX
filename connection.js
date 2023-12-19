const mysql = require("mysql");

const connection = mysql.createPool({
    connectionLimit: 100, //important
    multipleStatements : true,
    host: "keyvaultx.cwvqbjfrkce2.us-east-1.rds.amazonaws.com",
    user: "admin",
    password: "debanjan",
    database: "KeyVaultX"
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