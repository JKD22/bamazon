var inquirer = require('inquirer');
var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "bamazonDB"
});

// declare array in global scope
var itemList = [];
// initial connection
connection.connect(function(err) {
    // select all from products table
    connection.query('SELECT * FROM products;', function(err, res) {
        if (err) throw err;
        // for every row in the products table
        for (let i = 0; i < res.length; i++) {
            // declare variable with relevant table data as a string
            var productQuery = JSON.stringify(res[i].item_id) + ": " + JSON.stringify(res[i].product_name) + " $" + JSON.stringify(res[i].price);
            // push productQuery string to itemList array
            itemList.push(productQuery);
            if (err) throw err;
        }
        // script for inquirer
        var script = [
            {
            type: 'list',
            name: 'selection',
            choices: [
                itemList[0],itemList[1],itemList[2],itemList[3],itemList[4],itemList[5],itemList[6],itemList[7],itemList[8],itemList[9]
                ]
            },
            {
                type: 'default',
                name: 'amount',
                messsage: 'How many would you like?'
            }
        ];
    //inquirer prompt runs with script then
    inquirer.prompt(script).then(answers => {
        // variable containing item_id of selected item
        var selectedItem = answers.selection.slice(0,1);
        // variable containing the remaining stock of the selected item
        var remainingStock = res[selectedItem - 1].stock_quantity - answers.amount;
        // variable containing price of the total purchase
        var totalPrice = answers.amount * res[selectedItem - 1].price;
        // function to check stock - if less than 1 returns error - else logs total price and order confirmation
        function checkStock() {
            if (remainingStock < 1) {
                console.log('Insufficient stock');
                connection.end();
            }
            else {
                console.log("Order confirmed\nTotal: $" + totalPrice);
                connection.end();
            }
        }
        // run checkStock
        checkStock();
        // update products table with the new remainingStock where item_id matches
        connection.query(`UPDATE products SET stock_quantity="${remainingStock}" WHERE item_id="${selectedItem}";`, function(err, res) {
            if (err) throw err;
            });
        });
    });
    if (err) throw err;
    console.log("connected as: " + connection.threadId); 
});
