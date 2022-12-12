const fs = require("fs");
const prompt = require("prompt-sync")({ sigint: true });

/*********************************************************************/
function printMenu() {
  console.log("-> Choose operation to perform\n");
  console.log("1. Addition");
  console.log("2. Substraction");
  console.log("3. Multiplication");
  console.log("4. Division");
  console.log("5. View history");
}
/*********************************************************************/
async function validateChoice() {
  const selectedOption = await prompt("\nEnter your choice: ");
  if (["1", "2", "3", "4", "5"].includes(selectedOption)) {
    return selectedOption;
  }
  console.log("Wrong option selected, retry again\n");
  return validateChoice();
}
/*********************************************************************/
function writeFileContents(contents) {

    fs.appendFile("result.txt", contents, function (err) {
      if (err) return console.log(err);
    });
  
}
/*********************************************************************/
async function getResult(var1, var2, choice){
  if (choice === "1" ){return parseInt(var1) + parseInt(var2); }
  else if (choice === "2" ){return parseInt(var1) - parseInt(var2); }
  else if (choice === "3" ){return parseInt(var1) * parseInt(var2); }
  else{return parseInt(var1) / parseInt(var2); }
}
/*********************************************************************/
async function performOperation(choice) {
  let result = null;
  let resString = null;

  if (choice !== "5"){
    const var1 = await prompt("Enter first number: ");
    const var2 = await prompt("Enter second number:");
    result = await getResult(var1, var2, choice);

    if (choice === "1" ){
      resString = `${var1} + ${var2} = ${result} \r\n`;
    }else if (choice === "2"){
      resString = `${var1} - ${var2} = ${result} \r\n`;
    }else if (choice === "3"){
      resString = `${var1} * ${var2} = ${result} \r\n`;
    }else if (choice === "4"){
      resString = `${var1} / ${var2} = ${result} \r\n`;
    } 
    console.log("\nResult: ");
    console.log(resString);
    writeFileContents(resString);
  }
  else{
    fs.readFile("Result.txt", 'utf8', (err, data) => {
      if(err) {
        console.log(err.message);
      } else {
        console.log(data);
      }
    });
  }
  
  return;
}
/*********************************************************************/
async function app() {
  console.log();
  printMenu();
  const selectedOperation = await validateChoice();
  await performOperation(selectedOperation);
}
/*********************************************************************/
console.log("********* Welcome to Calculator App **********z");
app();
