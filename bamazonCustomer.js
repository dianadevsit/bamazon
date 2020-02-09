const mysql = require("mysql");
const inquirer = require("inquirer");

// create the connection information for the sql database
const connection = mysql.createConnection({
  host: "localhost",  // use 'localhost' for your local mysql server
  port: 3306,         // port Number
  user: "root",       // your username
  password: "Dwl24336", // your password
  database: "bamazon" // database name
});

// connect to the mysql server and sql database
connection.connect(function (err) {
  if (err) throw err;
  // run the start function after the connection is made
  start();
});

// start the processing
function start() {
  connection.query("SELECT item_id, product_name, price FROM products", displayChoices);
}

displayChoices = function (err, results) {
  if (err) throw err;

  //load results into an array  
  let choiceArray = [];
  for (let i = 0; i < results.length; i++) {
    let item = {};
    item.name = results[i].item_id + "   " + results[i].product_name + "       $ " + results[i].price;
    choiceArray.push(item);
  }

  // prompt the user for which item they would like to buy
  inquirer
    .prompt([
      {
        name: "choice",
        type: "list",
        choices: choiceArray,
        message: "Which item would you like to buy?"
      },
      {
        name: "idOfItem",
        type: "input",
        message: `Enter the ID of the item you would like to buy ("q" to quit):`,
        validate: function (value) {
          if (value != "q") {
            if (value != "") {
              if (Number.isInteger(Number(value))) {
                return true;
              } else {
                console.log(`  "IDs have to be numbers. Please reenter the ID from the list ("q" to quit)"`);
                return false;
              }
            } else {
              console.log(`  "IDs have to be numbers. Please reenter the ID from the list ("q" to quit)"`);
              return false;
            }
          } else {
            return true;
          }
        }
      }
    ])
    .then(function (answer) {
      if (answer.idOfItem != "q") {
        checkID(answer.idOfItem);
      } else {
        console.log(`Good bye!`)
        connection.end();
      }
    });
}

// Check if the ID entered is a valid ID
function checkID(itemID) {
  connection.query("SELECT count(*) as tcount FROM products WHERE item_id = " + itemID, function verifyID(err, countResults) {
    if (err) throw err;
    let countValue = countResults[0].tcount;
    if (countValue <= 0) {
      console.log(`\r\n`);
      console.log(`ID "${itemID}" is not in the list of products, Please re-enter a valid ID
      `);
      start();
    } else {
      askForQty(itemID)
    }
  });
}

// If ID is valid, ask for quantity
function askForQty(itemID) {
  inquirer
    .prompt([
      {
        name: "itemQty",
        type: "input",
        message: `How many of it would you like to buy("q" to quit)?`,
        validate: function (value) {
          if (value != "q") {
            if ((value != "") && (value > 0)) {
              if (Number.isInteger(Number(value))) {
                return true;
              } else {
                console.log(`  "Please correct your entry and enter a whole number greater than zero ("q" to quit)"`);
                return false;
              }
            } else {
              console.log(`  "Please correct your entry and enter a whole number greater than zero ("q" to quit)"`);
              return false;
            }
          } else {
            return true;
          }
        }
      }
    ])
    .then(function (answer) {
      if (answer.itemQty != "q") {
        checkInventory(itemID, answer.itemQty);
      } else {
        console.log(`Good bye!`)
        connection.end();
      }
    });
}

// If valid quantity, check inventory to make sure it is available.
function checkInventory(itemID, itemQty) {
  connection.query("SELECT product_name, price, stock_quantity FROM products WHERE item_id = " + itemID, function checkStock(err, InvResults) {
    if (err) throw err;
    compareInventoryToAskQty(InvResults[0].product_name, InvResults[0].stock_quantity, InvResults[0].price, itemID, itemQty);
  });
}

function compareInventoryToAskQty(name, Quantity, price, id, qty) {
  if (qty <= Quantity) {
    console.log(`You bought ${qty} ${name}(s) for a total of : $${qty * price}`)
    updateItem(id, Quantity - qty);
  } else {
    console.log("Sorry. Insufficient quantity!");
    connection.end();
  }
}

// If the sale is complete, update the database with the new available quantity
function updateItem(itemID, newQuantity) {
  // Update stock after sale
  connection.query(
    "UPDATE products SET ? WHERE ?",
    [
      {
        stock_quantity: newQuantity
      },
      {
        item_id: itemID
      }
    ],
    function (err) {
      if (err) throw err;
      // console.log("Stock quantity updated successfully!");
      connection.end();
    }
  );
}