import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import mongoose, { ConnectOptions } from "mongoose";

import userRoute from "./Routes/userRoutes";
import TodoRoute from "./Routes/todoRoutes";
import bodyParser from "body-parser";

dotenv.config();
const app: Application = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(helmet());

mongoose.Promise = global.Promise;
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGO_URL || "", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as ConnectOptions)
  .then(() => {
    console.log("Successfully connected to the database");
  })
  .catch((err) => {
    console.log("Something went wrong", err);
    process.exit(1);
  });

app.use(cors());

app.get("/", (req: Request, res: Response) => {
  return res.json({ message: "Welcome  I am testing again" });
});

app.use("/api/users", userRoute);
app.use("/api/todos", TodoRoute);

const PORT = process.env.PORT || 2000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

export default app;
