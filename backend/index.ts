import express from "express";
import jsonServer from "json-server";
import path from "path";
import cors from "cors";

const app = express();
const port = process.env.PORT || 3000;

// handle CORS
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept"],
  })
);

app.use(express.static(path.resolve("build")));

app.use("/api", jsonServer.router("db.json"));

app.listen(port, () => {
  console.log(`🚀 Server started on port ${port}`);
});
