// Напишите программу для вывода в консоль простых чисел, чтобы они попадали в указанный
// диапазон включительно. При этом числа должны окрашиваться в цвета по принципу светофора:
// ● первое число выводится зелёным цветом;
// ● второе — жёлтым;
// ● третье — красным.

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
let col = "red";
for (let i = Number(from); i <= Number(to); i++) {
  if (isPrimeNum(i)) {
    if (col === "red") {
      col = "green";
      console.log(colors.green(i));
    } else if (col === "green") {
      col = "yellow";
      console.log(colors.yellow(i));
    } else if (col === "yellow") {
      col = "red";
      console.log(colors.red(i));
    }
  } else {
    console.log(colors.red(`${i}: Not prime number`));
  }
}
