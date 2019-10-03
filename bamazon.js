// Creating the connection for the information and the sql database
const mysql = require("mysql");
const inquirer = require("inquirer");
const connection = mysql.createConnection({
  host: "localhost",
  port: 3306, 
  user: "root", 
  password: "Dwl24336", 
  database: "bamazon" 
});

connection.connect(function(err) {
  if (err) throw err;
  start();
  //Running the start function after the connection is made
});

function start() {
  connection.query("SELECT item_id, product_name, price FROM products", displayChoices);
}
displayChoices = function(err, results) {
  if (err) throw err;
// An array with results    
  let choiceArray = [];
  for (let i = 0; i < results.length; i++) {
    let item = {};
    item.name = results[i].item_id + "   " + results[i].product_name + "       $ " + results[i].price;
    choiceArray.push(item);
  }
  // Prompt the user for items
  inquirer.prompt([{
    name: "choice",
    type: "list",
    choices: choiceArray,
    message: "Which item would you like to buy?"
  }, {
    name: "idOfItem",
    type: "input",
    message: `Enter the ID of the item you would like to buy ("q" to quit):`,
    validate: function(value) {
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
  }]).then(function(answer) {
    if (answer.idOfItem != "q") {
      checkID(answer.idOfItem);
    } else {
      console.log(`Have a good one!`)
      connection.end();
    }
  });
}
function checkID(itemID) {
  connection.query("SELECT count(*) as tcount FROM products WHERE item_id = " + itemID, function verifyID(err, countResults) {
    if (err) throw err;
    let countValue = countResults[0].tcount;
    if (countValue <= 0) {
    //   console.log(`\r\n`);
      console.log(`ID "${itemID}" is not in the list of products, Please re-enter a valid ID
      `);
      start();
    } else {
        askForQuantity(itemID)
    }
  });
}
// Ask for quantity
function askForQuantity(itemID) {
  inquirer.prompt([{
    name: "itemQuantity",
    type: "input",
    message: `How many of it would you like to buy("q" to quit)?`,
    validate: function(value) {
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
  }]).then(function(answer) {
    if (answer.itemQuantity != "q") {
      checkInventory(itemID, answer.itemQuantity);
    } else {
      console.log(`Have a good one!`)
      connection.end();
    }
  });
}
// If valid quantity, check inventory to make sure it is available.
function checkInventory(itemID, itemQuantity) {
  connection.query("SELECT product_name, price, stock_quantity FROM products WHERE item_id = " + itemID, function checkStock(err, InvResults) {
    if (err) throw err;
    compareInventoryToAskQty(InvResults[0].product_name, InvResults[0].stock_quantity, InvResults[0].price, itemID, itemQuantity);
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
// New quantity
function updateItem(itemID, newQuantity) {
// Update
  connection.query("UPDATE products SET ? WHERE ?", [{
    stock_quantity: newQuantity
  }, {
    item_id: itemID
  }], function(err) {
    if (err) throw err;
    // console.log("Stock quantity updated");
    connection.end();
  });
}