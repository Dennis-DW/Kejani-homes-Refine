import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet"; // For adding security headers
import rateLimit from "express-rate-limit"; // For rate limiting

import connectDB from "./mongodb/connect.js";
import propertyRouter from "./routes/property.routes.js";
import userRouter from "./routes/user.routes.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(helmet()); // Add security headers

// Rate limiting
const limiter = rateLimit({
 windowMs: 15 * 60 * 1000, // 15 minutes
 max: 100, // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Routes
app.get("/", (req, res) => {
 res.send({ message: "Hello World" });
});

// Add a route for /api/v1
app.get("/api/v1", (req, res) => {
 res.send({ message: "Welcome to the API v1" });
});

app.use("/api/v1/users", userRouter);
app.use("/api/v1/properties", propertyRouter);


// Error handling middleware
app.use((err, req, res, next) => {
 console.error(err.stack);
 res.status(500).send('Something broke!');
});

const startServer = async () => {
 try {
    // Validate environment variables
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is not set in the environment variables.");
    }

    // Connect to database
    await connectDB(process.env.MONGO_URI);

    // Start server
    app.listen(8080, () =>
      console.log("Server started on port http://localhost:8080")
    );
 } catch (error) {
    console.error("Error starting server:", error);
    process.exit(1); // Exit the process with an error code
 }
};

startServer();
