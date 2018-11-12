const mysql = require("mysql");
const inquirer = require('inquirer');
const Table = require('cli-table');


const connection = mysql.createConnection({
    host: "localhost",

    // port
    port: 3306,

    // username
    user: "root",

    // password
    password: "",
    database: "bamazon_db"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("Welcome to Bamazon! You're officially ID " + connection.threadId);
    //callling main function
    bamazon();    

});

function bamazon() { 

    connection.query('SELECT * FROM products', function (err, res) {
        if (err) throw err;

        var table = new Table(
            {
                head: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"],
                colWidths: [30, 30, 30 , 30]
            });

}

console.log(table.toString());

