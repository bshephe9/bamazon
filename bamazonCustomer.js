const mysql = require("mysql");
const inquirer = require('inquirer');
const Table = require('cli-table');


const connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "",
    database: "bamazon_db"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("Welcome to Bamazon! You're officially ID " + connection.threadId);

    bamazon();      //Call main function

});              

// function to display inventory 
function bamazon() {
    connection.query('SELECT * FROM products', function (err, res) {
        if (err) throw err;

        var table = new Table(
            {
                head: ["Product ID", "Product Name", "Department Name", "Price", "Quantitiy"],
                colWidths: [10, 70, 25, 15, 15],
            });

        // Set/Style table headings and Loop through entire inventory
        for (var i = 0; i < res.length; i++) {
            table.push(
                [res[i].id, res[i].product_name, res[i].department_name, parseFloat(res[i].price).toFixed(2), res[i].stock_quantitiy]
            );
        }

        console.log(table.toString());
    

        // Prompt Customers Input
        inquirer.prompt([
            {
                type: "number",
                message: "Please enter the Product ID of the item that you would like to buy?",
                name: "id"
            },
            {
                type: "number",
                message: "How many would you like to buy?",
                name: "quantity"
            },
        ])

            // Ordering function
            .then(function (cart) {

                var quantitiy = cart.quantitiy;
                var itemID = cart.id;

                connection.query('SELECT * FROM products WHERE id=' + itemID, function (err, selectedItem) {
                    if (err) throw err;

                    // Varify item quantity desired is in inventory
                    if (selectedItem[0].stock_quantitiy - quantitiy >= 0) {

                        console.log("INVENTORY AUDIT: Quantity in Stock: " + selectedItem[0].stock_quantitiy + " Order Quantity: " + quantitiy);

                        console.log("Congratulations! Bamazon has suffiecient inventory of " + selectedItem[0].product_name+ " to fill your order!");

                       

                        // Calculate total sale, and fix 2 decimal places
                        console.log("Thank You for your purchase. Your order total will be "+ (cart.quantitiy * selectedItem[0].price).toFixed(2) + " dollars.", "\nThank you for shopping at Bamazon!");

                        // Query to remove the purchased item from inventory.                       
                        connection.query('UPDATE products SET stock_quantity=? WHERE id=?', [selectedItem[0].stock_quantitiy - quantitiy, itemID],

                            function (err, inventory) {
                                if (err) throw err;

                                bamazon();  // Runs the prompt again, so the customer can continue shopping.
                            });  // Ends the code to remove item from inventory.

                    }
                    // Low inventory warning
                    else {
                        console.log("INSUFFICIENT INVENTORY ALERT: \nBamazon only has " + selectedItem[0].stock_quantitiy + " " + selectedItem[0].product_name + " in stock at this moment. \nPlease make another selection or reduce your quantity.", "\nThank you for shopping at Bamazon!");

                        bamazon();  // Runs the prompt again, so the customer can continue shopping
                    }
                });
            });
    });
}  

