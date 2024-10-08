import express from "express";
import mongoose from "mongoose";
import fileUpload from "express-fileupload";

import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";
import postRouter from "./routes/postRoutes.js";
import cors from "cors";
import dotenv from "dotenv";
import commentRouter from "./routes/commentRoutes.js";
import storyRouter from "./routes/storyRoutes.js";
import notificationRouter from "./routes/notificationRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

let MONGODB_URI = process.env.MONGODB_URI;
if (process.env.ENVIRONMENT === "development") {
  MONGODB_URI = "mongodb://127.0.0.1:27017/pikxrDB";
}

var whitelist = ["http://localhost:5173", "https://pikxr.onrender.com"];
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.includes(origin) || origin === undefined) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.static("public"));
app.use(fileUpload());
app.use(authRouter);
app.use(userRouter);
app.use(postRouter);
app.use(commentRouter);
app.use(storyRouter);
app.use(notificationRouter);

app.get("/", (req, res) => {
  res.sendStatus(200);
});

mongoose.connect(MONGODB_URI).then(
  app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`);
  })
);
