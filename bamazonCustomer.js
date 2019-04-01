var inquirer = require('inquirer');
var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "bamazonDB"
});

var itemList = [];

connection.connect(function(err) {
    connection.query('SELECT * FROM products;', function(err, res) {
        if (err) throw err;
        for (let i = 0; i < res.length; i++) {
            var productQuery = JSON.stringify(res[i].item_id) + ": " + JSON.stringify(res[i].product_name) + " $" + JSON.stringify(res[i].price);
            itemList.push(productQuery);
            if (err) throw err;
        }
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
        
    inquirer.prompt(script).then(answers => {
        var selectedItem = answers.selection.slice(0,1);
        var remainingStock = res[selectedItem - 1].stock_quantity - answers.amount;
        var totalPrice = answers.amount * res[selectedItem - 1].price;
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

        connection.query(`UPDATE products SET stock_quantity="${remainingStock}" WHERE item_id="${selectedItem}";`, function(err, res) {
            if (err) throw err;
            checkStock();
        });
    });
    });
    if (err) throw err;
    console.log("connected as: " + connection.threadId); 
});
