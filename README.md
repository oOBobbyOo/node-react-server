# node-react-server

```js
//安装依赖
npm install

//开启服务
npm start

// server
import express from "express";
import path from "path";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import mongoose from "mongoose";
import Promise from "bluebird";
import auth from "../routes/auth";
import signup from "../routes/signup";

const port = process.env.port || 3001;
const app = express();

app.use(cors());
app.use(bodyParser.json());
dotenv.config();

mongoose.Promise = Promise;
mongoose.connect(process.env.MONGODB_URL, err => {
  if (err) {
    console.log("Error!" + err);
  } else {
    console.log("Connected to mongodb!");
  }
});

app.use("/api/auth", auth);
app.use("/api/signup", signup);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}...`);
});
```
