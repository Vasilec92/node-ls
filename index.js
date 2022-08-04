// Напишите программу для вывода в консоль простых чисел, чтобы они попадали в указанный
// диапазон включительно. При этом числа должны окрашиваться в цвета по принципу светофора:
// ● первое число выводится зелёным цветом;
// ● второе — жёлтым;
// ● третье — красным.

/* const colors = require("colors/safe");
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
}); */
let rlSync = require("readline-sync");
const colors = require("colors/safe");

const isPrimeNum = (num) => {
  for (let i = 2; i < num; i++) {
    if (num % i == 0) {
      return false;
    }
  }
  return true;
};

let from = rlSync.question("Diaposon from ?\n");
let to = rlSync.question("Diaposon to ?\n");
console.log(`Diaposon, ${from}-${to}`);

for (let i = Number(from); i <= Number(to); i++) {
  console.log(i);
}

let col = "red";
for (let i = 3; i <= to; i++) {
  if (isPrimeNum(i)) {
    if (col === "red") {
      col = "green";
      console.log(colors.green(i));
      return;
    }
    if (col === "green") {
      col = "yellow";
      console.log(colors.yellow(i));
      return;
    }
    if (col === "yellow") {
      col = "red";
      console.log(colors.red(i));
      return;
    }
  } else {
    console.log(colors.red(`${i}: Not prime number`));
  }
}
