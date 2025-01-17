import { Server } from "socket.io";

const io = new Server(8000, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
        credentials: true
    }
  });

export default io;