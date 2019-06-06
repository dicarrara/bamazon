var mysql = require("mysql");
var inquirer = require("inquirer");
const cTable = require("console.table");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Lbfyf86111",
  database: "bamazon"
});

connection.connect(function(error) {
  if (error) throw error;
});

function managerOptions() {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "Select performance?",
      choices: [
        "View product for sale",
        "View Low Inventory",
        "Add to Inventory",
        "Add New Product",
        "Nothing"
      ]
    })
    .then(function(answer) {
      switch (answer.action) {
        case "View product for sale":
          viewProduct();
          break;

        case "View Low Inventory":
          viewLowInventory();
          break;

        case "Add to Inventory":
          addToInventory();
          break;

        case "Add New Product":
          addNewProduct();
          connection.end();
          break;

        case "Nothing":
          connection.end();
          break;
      }
    });
}

managerOptions();

function viewProduct() {
  connection.query(
    "SELECT id, product_name, price, stock_quantity FROM products",
    function(error, results) {
      if (error) throw error;
      console.table(results);
    }
  );
}
