import express from "express";
import corsOptions from "./src/utils/corsOptions";
// routes
import IndexRouter from "./src/routes/index";
import AuthRouter from "./src/routes/auth";
// middlewares
import cookieParser from "cookie-parser";
import cors from "cors";
import errorHandler from "./src/middlewares/error_handler/errorHandler";
import morgan from "morgan";
import successLogger from "./src/middlewares/logger/success_logger";
import errorLogger from "./src/middlewares/logger/error_logger";

// Init express app
const app = express();

// middlewares
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(successLogger);
app.use(errorLogger);
app.use(morgan("tiny"));

// Routes
app.use("/api", IndexRouter);
app.use("/api/auth", AuthRouter);

// Unknown endpoint
app.use((_req, res) => {
	res.status(404).json({ error: "unknown endpoint" });
});

// Error handler middleware
app.use(errorHandler);

export default app;
