var mysql = require('mysql');
require('dotenv').config();
var inquirer = require('inquirer');
const cTable = require('console.table');

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: process.env.myPassword,
  database: "bamazon"
});

connection.connect(function(error) {
  if (error) throw error;
  afterConnection();
});

function afterConnection() {
  connection.query("SELECT id, product_name, price FROM products", function(error,results) {
    if (error) throw error;
    console.table(results);
    questionToUser();
  });
}

function questionToUser() {
  inquirer
    .prompt([
      {
        name: "nameId",
        type: "input",
        message: "Enter the id of the product you want to purchase"
      },
      {
        name: "stock",
        type: "input",
        message: "Enter the quantity you want to purchase"
      }
    ])
    .then(answers => {
      connection.query(
        "SELECT * FROM products WHERE ?",
        { id: answers.nameId },
        function(error, results) {
          if (error) throw error;
          let price = results[0].price;

          if (results[0].stock_quantity >= answers.stock) {
            let newAmountOfItems = results[0].stock_quantity - answers.stock;
            connection.query(
              "UPDATE products SET ? WHERE ?",
              [
                {
                  stock_quantity: newAmountOfItems
                },
                {
                  id: answers.nameId
                }
              ],
              function(err) {
                if (err) throw err;

                var totalCost = price * answers.stock;
                console.log(
                  `Your cost is $ ${parseFloat(totalCost).toFixed(2)}`
                );
                continueShopping();
              }
            );
          } else {
            console.log("Insufficient quantity!");
            continueShopping();
          }
        }
      );
    });
}

function continueShopping() {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: " Would like to continue shopping?",
      choices: ["Yes", "No"]
    })
    .then(function(answer) {
      switch (answer.action) {
        case "Yes":
          questionToUser();
          break;

        case "No":
          connection.end();
          break;
      }
    });
}
