const fs = require("fs/promises");
const { lstatSync } = require("fs");
const readline = require("readline");
const yargs = require("yargs");
const path = require("path");
const inquirer = require("inquirer");

let currentDirectory = process.cwd();

const options = yargs
  .positional("d", {
    describe: "Path to directory",
    default: process.cwd(),
  })
  .positional("p", {
    describe: "Pattern",
    default: "",
  }).argv;

console.log(options);

class ListItem {
  constructor(path, fileName) {
    this.path = path;
    this.fileName = fileName;
  }

  get isDir() {
    return lstatSync(this.path).isDirectory();
  }
}

const run = async () => {
  const list = await fs.readdir(currentDirectory);
  const items = list.map(
    (fileName) => new ListItem(path.join(currentDirectory, fileName), fileName)
  );

  const item = await inquirer
    .prompt([
      {
        name: "fileName",
        type: "list", // input, number, confirm, list, chackbox, password
        message: `Chouse ${currentDirectory}`,
        choices: items.map((item) => ({ name: item.fileName, value: item })),
      },
    ])
    .then((answer) => answer.fileName);

  if (item.isDir) {
    currentDirectory = item.path;
    return await run();
  } else {
    const data = await fs.readFile(item.path, "utf8");

    if (options.p == null) console.log(data);
    else {
      const regExp = new RegExp(options.p);
      console.log(data.match(regExp));
    }
  }
};

run();
