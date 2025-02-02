const { Server } = require("socket.io");
const http = require("http");

const port = process.env.PORT || 5000;  // Use environment variable for port (or fallback to 5000)

const server = http.createServer();
const io = new Server(server, { cors: { origin: "*" } });

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("offer", (data) => {
    socket.broadcast.emit("offer", data);
  });

  socket.on("answer", (data) => {
    socket.broadcast.emit("answer", data);
  });

  socket.on("candidate", (data) => {
    socket.broadcast.emit("candidate", data);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// Use dynamic PORT for cloud platforms
server.listen(port, () => console.log(`Signaling Server Running on Port ${port}`));
