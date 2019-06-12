var mysql = require("mysql");
require('dotenv').config();
var inquirer = require("inquirer");
const cTable = require("console.table");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: process.env.myPassword,
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
          break;

        case "Nothing":
          connection.end();
          break;
      }
    });
}

managerOptions();

function viewProduct() {
  connection.query("SELECT * FROM products", function(error, results) {
    if (error) throw error;
    console.table(results);
    managerOptions();
  });
}

function viewLowInventory() {
  connection.query("SELECT * FROM products WHERE stock_quantity < 5", function(
    error,
    results
  ) {
    if (error) throw error;
    console.table(results);
    managerOptions();
  });
}

function addToInventory() {
  inquirer
    .prompt([
      {
        name: "id",
        type: "input",
        message: " Enter the Item ID of the product"
      },
      {
        name: "quantity",
        type: "input",
        message: " Enter quantity you wish to add"
      }
    ])
    .then(function(answer) {
      connection.query(
        "SELECT * FROM products WHERE ?",
        { id: answer.id },
        function(err, res) {
          let itemQuantity = res[0].stock_quantity + parseInt(answer.quantity);

          connection.query(
            "UPDATE products SET ? WHERE ?",
            [
              {
                stock_quantity: itemQuantity
              },
              {
                id: answer.id
              }
            ],
            function(err, results) {
              if (err) throw err;
            }
          );

          connection.query(
            "SELECT * FROM products WHERE ?",
            { id: answer.id },
            function(err, results) {
              console.table(results);
              managerOptions();
            }
          );
        }
      );
    });
}

function addNewProduct() {
  inquirer
    .prompt([
      {
        name: "product",
        type: "input",
        message: "Enter new product name"
      },
      {
        name: "department",
        type: "input",
        message: "Enter department name"
      },
      {
        name: "price",
        type: "input",
        message: "Enter price"
      },
      {
        name: "quantity",
        type: "input",
        message: " Enter quantity you wish to add"
      }
    ])
    .then(function(answer) {
      connection.query(
        "INSERT INTO products SET ?",
        {
          product_name: answer.product,
          department_name: answer.department,
          price: answer.price,
          stock_quantity: answer.quantity
        },
        function(err, res) {
          if (err) throw err;
          connection.query("SELECT * FROM products", function(err, results) {
            if (err) throw err;
            console.table(results);
            managerOptions();
          });
        }
      );
    });
}
