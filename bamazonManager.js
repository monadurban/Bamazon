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
        message: "Welcome Bamazon Manager! What would you like to do today?",
        choices: ["displayProducts", "lowInventory", "restockInventory", "addNewProduct"]
    }).then(function(answer) {
        if (answer.welcome == "displayProducts"){
            displayProducts();
        }

        else if (answer.welcome == "lowInventory"){
            lowInventory();
        }
            
        else if (answer.welcome == "restockInventory") {
              restockInventory();
        }

        else if (answer.welcome == "addNewProduct"){
          addNewProduct();
        }
        
        else {
            console.log("Goodbye");
            return;
        }
    })
};

//Displays products
 var displayProducts = function() {

    connection.query('SELECT * FROM products', function(err,res){
        //return product results
        console.table(res)
        start();
})  
};  

//Display products with low inventory
var lowInventory = function() {
  
  connection.query('SELECT * FROM products WHERE stock_quantity < 5', function(err, res){
      //if (err) throw err;

      //return results
      console.log('Low inventory items are shown below.\n');
      console.table(res)

      start();
})
};  

var restockInventory = function(){
      //displayProducts();
            var products = [] ;

      //select item_id , product_name from bamazon.products
      connection.query(`select item_id , product_name , stock_quantity  from products;`, function(err,res){

       res.forEach( function(product){
        var temp =  `${product.item_id}) ${product.product_name} qty: |${product.stock_quantity}|`
        // console.log(temp)
        products.push(temp)
       })
       inquirer.prompt([
        {
            name: "productIdRestock",
            type: "list",
            message: "Choose the ID of the product you want to restock:",
            choices: products
        },
        {
            name: "adding",
            type: "input",
            message: "How many units do you want to add?"
        }, 
        ]).then(function(answer){
            stri = answer.productIdRestock
            stri = stri.split(' ')
            var qty = ''
            stri.forEach((partial,index)=>{
                    if(partial.includes('|')){
                        qty = partial
                    }
            })
            qty = qty.split('')
            qty.pop()
            qty.shift()
            qty = qty.join('')

            var id = stri[0]
            id = id.replace(')','')
            var toadd = answer.adding
            var total = parseInt(qty) + parseInt(toadd)

            connection.query(`update products set stock_quantity =${total} where item_id=${id};`, function(err,res){

                console.log(`You just added ${toadd} units.`)

                start()
            })
        })

      })
    };  

//Add a new product with inventory number
var addNewProduct = function(){
    
      inquirer.prompt({
          name:'productToAdd',
          type: 'input',
          message: "What product would you like to add?"        
      }).then(function(answer){
          var managerAdded = answer.productToAdd

      inquirer.prompt({
          name:'departmentToAdd',
          type: 'input',
          message: "What department will the product be added to?"        
      }).then(function(answer){
          var deptToAdd = answer.departmentToAdd

      inquirer.prompt({
          name:'pricingToAdd',
          type: 'input',
          message: "What is the price of the product?"        
      }).then(function(answer){
          var priceToAdd = answer.pricingToAdd

        inquirer.prompt({
            name:'answerHowMany',
            type: 'input',
            message: "How many " + managerAdded + " would you like to add?"        
        }).then(function(answer){
            var howMany = answer.answerHowMany
        
            console.log(` Manager is adding ${managerAdded}, to department ${deptToAdd}, in the quantity of ${howMany}`)

            // INSERT into products (product_name,stock_quantity)
            connection.query(`INSERT into products (product_name,department_name,price,stock_quantity) VALUES ('${managerAdded}','${deptToAdd}',${priceToAdd},${howMany});`, function(err,res){
                
              if(res){
                  console.log('New item was added.')

                  start()
              }
          })
        })
      })
    })
  })
};