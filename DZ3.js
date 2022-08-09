import fs from "fs";
import readline from "readline";
import * as path from "path";

const generateFile = () => {
  const ACCESS_LOG = "./access.log";

  const writeStreamAccessLog = fs.createWriteStream(ACCESS_LOG, {
    encoding: "utf-8",
    flags: "a", //флаг - дозаписываем в файл
  });
  console.log("Генерируем файл 100мб");
  const writingFunc = async (query) =>
    new Promise((resolve, reject) =>
      writeStreamAccessLog.write(query, resolve)
    );

  const ipLogGen = async () => {
    let ip =
      Math.floor(Math.random() * 255) +
      1 +
      "." +
      Math.floor(Math.random() * 255) +
      "." +
      Math.floor(Math.random() * 255) +
      "." +
      Math.floor(Math.random() * 255);
    let arr = [
      `${ip} - - [25/May/2021:00:07:24 +0000] "POST /baz HTTP/1.1" 200 0 "-" "curl/7.47.0"`,
      `${ip} - - [25/May/2021:00:07:17 +0000] "GET /foo HTTP/1.1" 200 0 "-" "curl/7.47.0"`,
    ];
    for (const item of arr) {
      await writingFunc(item + "\n");
    }
    if (fs.lstatSync(ACCESS_LOG).size <= 104857600) {
      await ipLogGen();
    } else {
      writeStreamAccessLog.end(); //закрываем стрим
      console.log("Генерация завершена");
    }
  };
  //проверяем есть ли файл
  fs.stat(ACCESS_LOG, function (err, stat) {
    if (err == null) {
      fs.lstatSync(ACCESS_LOG).size <= 104857600
        ? ipLogGen()
        : console.log("Файл 100мб");
    } else if (err.code === "ENOENT") {
      ipLogGen();
    } else {
      console.log("Some other error: ", err.code);
    }
  });
};

generateFile();

const readStream = fs.createReadStream("./access.log", "utf-8");
const writeStream1 = fs.createWriteStream("./ip1_log");
const writeStream2 = fs.createWriteStream("./ip2_log");

let numStr = 0;

const rl = readline.createInterface({
  input: readStream,
  terminate: true,
});

rl.on("line", (line) => {
  if (line.includes("135.1.29.199")) {
    writeStream1.write(line + "\n");
  }

  if (line.includes("243.120.230.117")) {
    writeStream2.write(line + "\n");
  }

  console.log(++numStr);
});
