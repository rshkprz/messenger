import express from "express";
import http from "http";
import cors from "cors";

const app = express();
const server = http.createServer(app);

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

server.listen(8000, async () => {
  console.log("Server running on port 8000");
});
