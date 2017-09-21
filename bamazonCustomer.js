var mysql = require('mysql')
var inquirer = require('inquirer');
require ('console.table');

//create connection for sql database
var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'bamazon_DB'
  });

  console.log("Welcome to Bamazon!");
//connection to mysql server and sql database
  connection.connect(function(err) {
  if (err) throw err;
  start();
});

// start customer prompts
var start = function (){
    inquirer.prompt(
    {
        name: "welcome",
        type: "list",
        message: "Welcome, would you like to shop our current products?",
        choices: ["YES", "NO"]
    }).then(function(answer) {
        if (answer.welcome.toUpperCase() == "YES"){
            displayProducts();
        }
        else {
            console.log("Goodbye");
            return;
        }
    })
};

    var displayProducts = function() {

    connection.query('SELECT * FROM products', function(err,res){
        //return product results
        console.table(res)
    //delay asking next question
    setTimeout(function() {nextAsk();}, 1000);
})
};

// what does customer want
var nextAsk = function (){
    inquirer.prompt([
    {
        name: "productId",
        type: "list",
        message: "Choose the ID of the product you want to purchase:",
        choices: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]
    },  
    {
        name: "productUnits",
        type: "input",
        message: "How many units of this product would you like to puchase?",
        validate: function(value) {
            if (isNaN(value) == false) {
                return true;
            } else {
                return false;
            }
        }
    }]).then(function(answer) {
        console.log("-----------CHECK OUT------------------------");
            checkQuantity(answer);
    })
};

// compare quantity wanted to available stock
var checkQuantity = function(answer) {
    console.log("Checking available stock");
    var query = 'SELECT stock_quantity, price FROM products WHERE item_id =?';
    var params = answer.productId;

        connection.query(query, params, function(err, res) {
            if ( res[0].stock_quantity < answer.productUnits) {
                console.log("Insufficient quantity");
                nextAsk(1);
            }
            else {
                // calculate the total by pulling the price and multiply by product wanted  
                var total = answer.productUnits * res[0].price;
                var newQuantity = res[0].stock_quantity - answer.quantity;
                
                console.log('Total Cost: $' + total);

                connection.query("UPDATE `products` SET stock_quantity = (stock_quantity - ?) WHERE item_id = ?;", [answer.productUnits, answer.productId], function(err, res){
                    
                        console.log("Your order total is $" + total);
                    });
                
                }
        });

            setTimeout(function(){
                console.log("Thanks for your order!");
                continueShop();
            },2000);
            

//continue shopping or end program            
var continueShop = function() {
    inquirer.prompt(
    {
        name: "wantToShop",
        type: "list",
        message: "Would you like to continue shopping our current products?",
        choices: ["YES", "NO"]
      }).then(function(answer) {
          if (answer.wantToShop.toUpperCase() == "YES"){
              displayProducts();
          }
          else {
              console.log("Thank you for shopping with us!");
              return;
          }
      })
   };        
};
        