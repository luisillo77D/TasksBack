import express from "express";
import morgan from "morgan";
import authRoutes from "./routes/auth.routes.js";
import tasksRoutes from "./routes/task.routes.js";
import cors from "cors";
import cookieParser  from "cookie-parser";

const app = express();

app.use(cors(
    {
        origin: "*",
        credentials: true,
    }
));
app.use(cookieParser());
app.use(morgan("dev"));
app.use(express.json());

app.use("/api", authRoutes);
app.use("/api/tasks", tasksRoutes);

export default app;