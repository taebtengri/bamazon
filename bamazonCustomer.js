var inquirer = require("inquirer");
var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,


  user: "root",


  password: "Qweasdasd86",
  database: "bamazon"
});

function display(){
connection.query("SELECT * FROM products", function(err, res){
  				if (err) throw err;
  					for (var i = 0; i < res.length; i++) {
                
            console.log(" | id: " + res[i].id + " | Name: " + res[i].product_name + " | Department: " + res[i].department_name + " | Price: " + res[i].price + " | Stock: " + res[i].stock + " | ");
            }
            console.log("_______________________________________________________");
        });
};

display();
buying();
function buying(){
inquirer.prompt([

	{
    type: "input",
    message: "Enter the id of the product you want to buy:",
    name: "id"
  },

  	{
    type: "input",
    message: "Enter the quantity of the product you want to buy:",
    name: "quantity"
  }


  ]).then(function(user) {
  		connection.query("SELECT * FROM products WHERE id=?",[user.id], function(err, res) {
  					if (err) throw err;
  						var totalPrice = user.quantity*res[0].price;
  						if(res[0] == undefined ) {
  						console.log("Item not found."); 	
  						display();
  								buying();					
  						}

  						else if (res[0].stock < user.quantity) {
  							console.log("Insufficient quantity!");
  							display();
  								buying();
  						}
  						else {
  							connection.query("UPDATE products SET ? WHERE ?",
  							[
  								{
  									stock: res[0].stock - Number(user.quantity)
  								},

  								{
  									id: user.id

  								}

  							],function(err, res) {
  								if (err) throw err;

  								console.log("Order completed. Total cost: " + totalPrice);
  								display();
  								buying();
  							});
  						};
  					});


  });

};