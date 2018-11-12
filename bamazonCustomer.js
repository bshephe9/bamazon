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

// table display 
function bamazon() {
    connection.query('SELECT * FROM products', function (err, res) {
        if (err) throw err;

        var table = new Table(
            {
                head: ["Product ID", "Product Name", "Department Name", "Price", "Quantity"],
                colWidths: [10, 30, 30, 30 , 30]
            });

        // Set/Style table headings and Loop through entire inventory
        for (var i = 0; i < res.length; i++) {
            table.push(
                [res[i].id, res[i].product_name, res[i].department_name, parseFloat(res[i].price).toFixed(2), res[i].quantity]
            );
        }

        console.log(table.toString());


        // Customer Input Prompt
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

            .then(function (cart) {

                var quantity = cart.quantity;
                var itemID = cart.id;

                connection.query('SELECT * FROM products WHERE id=' + itemID, function (err, selectedItem) {
                    if (err) throw err;

                    // Varify item quantity desired is in inventory
                    if (selectedItem[0].quantity - quantity >= 0) {

                        console.log("INVENTORY AUDIT: Quantity in Stock: " + selectedItem[0].quantity + " Order Quantity: " + quantity);

                        console.log("Congratulations! Bamazon has suffiecient inventory of " + selectedItem[0].product_name + " to fill your order!");



                        // Calculate total sale, and fix 2 decimal places
                        console.log("Thank You for your purchase. Your order total will be " + (cart.quantity * selectedItem[0].price).toFixed(2) + " dollars.", "\nThank you for shopping at Bamazon!");

                        // Query to remove the purchased item from inventory.                       
                        connection.query('UPDATE products SET quantity=? WHERE id=?', [selectedItem[0].quantity - quantity, itemID],

                            function (err, inventory) {
                                if (err) throw err;

                                bamazon();  // Runs the prompt again, so the customer can continue shopping.
                            });  // Ends the code to remove item from inventory.

                    }
                    // Low inventory warning
                    else {
                        console.log("INSUFFICIENT INVENTORY ALERT: \nBamazon only has " + selectedItem[0].quantity + " " + selectedItem[0].product_name + " in stock at this moment. \nPlease make another selection or reduce your quantity.", "\nThank you for shopping at Bamazon!");

                        bamazon();  // Runs the prompt again, so the customer can continue shopping
                    }
                });
            });
    });
}

