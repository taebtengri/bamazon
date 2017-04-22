var inquirer = require("inquirer");
var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,


  user: "root",


  password: "Qweasdasd86",
  database: "bamazon"
});

main();

function main(){
inquirer.prompt([

	{
    type: "list",
    message: "Select action: ",
    choices: ["View Products for Sale", "Low Inventory", "Add to Inventory", "Add New Product"],
    name: "menu"
  },
  ]).then(function(user) {

  	if (user.menu == "View Products for Sale") {
  		view();
  	}
  	else if (user.menu =="Low Inventory") {
  		low();
  	}
  	else if (user.menu == "Add to Inventory") {
  		addInventory();
  	}
  	else if (user.menu == "Add New Product") {
  		addItem();
  	};


  });

 };

  function view() {
  	connection.query("SELECT * FROM products", function(err, res){
  				if (err) throw err;
  					for (var i = 0; i < res.length; i++) {
                
            console.log(" | id: " + res[i].id + " | Name: " + res[i].product_name + " | Department: " + res[i].department_name + " | Price: " + res[i].price + " | Stock: " + res[i].stock + " | ");
            }
            console.log("_______________________________________________________");
        });
  	main();
  };

  function low(){
  		connection.query("SELECT * FROM products WHERE stock <= 5", function(err, res){
  				if (err) throw err;
  					for (var i = 0; i < res.length; i++) {
  					
                
            console.log(" | id: " + res[i].id + " | Name: " + res[i].product_name + " | Department: " + res[i].department_name + " | Price: " + res[i].price + " | Stock: " + res[i].stock + " | ");
            }
            console.log("_______________________________________________________");
        });
  		main();
  };

  function addInventory() {
  		inquirer.prompt([

	{
    type: "input",
    message: "Enter the id of the product you want to add",
    name: "id"
  },

   	{
    type: "input",
    message: "Enter the quantity of the product you want to add:",
    name: "quantity"
  }


  ]).then(function(user) {
  	connection.query("SELECT * FROM products WHERE id=?",[user.id], function(err, res) {
  					if (err) throw err;
  						
  						if(res[0] == undefined ) {
  						console.log("Item not found."); 	
  											
  						}

  						else {
  							connection.query("UPDATE products SET ? WHERE ?",
  							[
  								{
  									stock: res[0].stock + Number(user.quantity)
  								},

  								{
  									id: user.id

  								}

  							],function(err, res) {
  								if (err) throw err;
  									

  								console.log("Done!");
  								view();

								});

							}



  							});

  				});

};

function addItem() {
	inquirer.prompt([

	{
    type: "input",
    message: "Enter the name of the product you want to add",
    name: "name"
  },

   	{
    type: "input",
    message: "Enter the department of the product you want to add:",
    name: "department"
  },
  {
    type: "input",
    message: "Enter the price of the product you want to add",
    name: "price"
  },
  {
    type: "input",
    message: "Enter the quantity of the product you want to add",
    name: "stock"
  }, ]).then(function(user) {
  		connection.query("INSERT INTO products (product_name, department_name, price, stock) VALUES (?, ?, ?, ?);",[user.name, user.department, user.price, user.stock], function(err, res) {
  					if (err) throw err;
  						console.log("Done!");
  						view();
  					});

  });

};



