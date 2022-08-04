const colors = require("colors/safe");
let readline = require("readline");

const isPrimeNum = (num) => {
  for (let i = 2; i < num; i++) {
    if (num % i == 0) {
      return false;
    }
  }
  return true;
};

let rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: ">",
});

rl.prompt();
let col = "red";
rl.on("line", (input) => {
  if (isPrimeNum(input)) {
    if (col === "red") {
      col = "green";
      console.log(colors.green(input));
      return;
    }
    if (col === "green") {
      col = "yellow";
      console.log(colors.yellow(input));
      return;
    }
    if (col === "yellow") {
      col = "red";
      console.log(colors.red(input));
      return;
    }
  } else {
    console.log(colors.red("Not prime number"));
  }

  //rl.close();
});
