const socket = require("socket.io");
const http = require("http");
const path = require("path");
const fs = require("fs");

const server = http.createServer((req, res) => {
  const indexPath = path.join(__dirname, "index.html");
  const readStream = fs.createReadStream(indexPath);
  readStream.pipe(res);
});

const io = socket(server);
const usersMap = {};
io.on("connection", (client) => {
  console.log("connection", client);
  usersMap[client.id] = {
    id: client.id,
    nik: `user${client.id}`,
  };

  const payload = {
    nik: usersMap[client.id].nik,
  };

  client.broadcast.emit("connect-server", payload);
  client.emit("connect-server", payload);

  client.on("client-msg", (data) => {
    console.log(data);
    const payload = {
      message: data.message,
      nik: usersMap[client.id].nik,
    };

    client.broadcast.emit("server-msg", payload);
    client.emit("server-msg", payload);
  });
  client.on("disconnect", () => {
    const payload = {
      nik: usersMap[client.id].nik,
    };

    client.broadcast.emit("disconnect-server", payload);
    client.emit("disconnect-server", payload);
    console.log("Disconnect");
    delete usersMap[client.id];
  });

  console.log(usersMap);
});

server.listen(5555);
