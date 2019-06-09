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
  afterConnection();
});


function afterConnection () {
    
        inquirer.prompt([{
            name: "manage",
            type: "rawlist",
            message: "\n\n What would you like to do?",
            choices: ["Set Up Departments", "View Product Sales by Department", "View All Product Sales", "Create New Department", "View Profits", "Exit Application"]
        }]).then(function(data) {
            switch (data.manage) {
                case "Set Up Departments":
                    bamazon.setUpDepartments(inq);
                    break;
                case "View Product Sales by Department":
                    bamazon.departments(inq);
                    break;
                case "View All Product Sales":
                    bamazon.lowInventory(inq);
                    break;
                case "Create New Department":
                    bamazon.addInventory(inq);
                    break;
                case "View Profits":
                    bamazon.addProduct(inq);
                    break;
                default:
                    bamazon.stopDb();
            }
        });
    
}