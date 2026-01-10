// import express from "express";
// import cookieParser from "cookie-parser";
// import cors from "cors";
// import "dotenv/config";

// import connectDB from "./configs/db.js";
// import connectCloudinary from "./configs/clodinary.js";

// import userRouter from "./routes/userRoute.js";
// import sellerRouter from "./routes/sellerRoute.js";
// import productRouter from "./routes/productRoute.js";
// import cartRouter from "./routes/cartRoute.js";
// import addressRouter from "./routes/addressRoute.js";
// import orderRouter from "./routes/orderRoute.js";

// const app = express();
// const port = process.env.PORT || 4000;

// // Connect to DB and Cloudinary
// await connectDB();
// await connectCloudinary();

// // Allowed origins for CORS
// const allowedOrigins = [
//   "http://localhost:5173",
//   "https://fresh-groceries-frontend.onrender.com",
// ];

// // Middleware
// app.use(express.json());
// app.use(cookieParser());
// app.use(
//   cors({
//     origin: function (origin, callback) {
//       if (!origin) return callback(null, true); // allow non-browser requests like Postman
//       if (allowedOrigins.includes(origin)) {
//         return callback(null, true);
//       } else {
//         return callback(new Error("Not allowed by CORS"));
//       }
//     },
//     credentials: true, // allow cookies/auth headers
//   })
// );

// // Test route
// app.get("/", (req, res) => res.send("API is Working"));

// // Routes
// app.use("/api/user", userRouter);
// app.use("/api/seller", sellerRouter);
// app.use("/api/product", productRouter);
// app.use("/api/cart", cartRouter);
// app.use("/api/address", addressRouter);
// app.use("/api/order", orderRouter);

// // Start server
// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import "dotenv/config";

import connectDB from "./configs/db.js";
import connectCloudinary from "./configs/clodinary.js";

import userRouter from "./routes/userRoute.js";
import sellerRouter from "./routes/sellerRoute.js";
import productRouter from "./routes/productRoute.js";
import cartRouter from "./routes/cartRoute.js";
import addressRouter from "./routes/addressRoute.js";
import orderRouter from "./routes/orderRoute.js";

const app = express();

/* ------------------ MIDDLEWARES ------------------ */

// 🔥 THIS IS THE MOST IMPORTANT PART
app.use(
  cors({
    origin: [
      "https://fresh-groceries-frontend.onrender.com",
      "http://localhost:5173",
    ],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

/* ------------------ DATABASE & CLOUDINARY ------------------ */

connectDB();
connectCloudinary();

/* ------------------ ROUTES ------------------ */

app.use("/api/user", userRouter);
app.use("/api/seller", sellerRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/address", addressRouter);
app.use("/api/order", orderRouter);

/* ------------------ TEST ROUTE ------------------ */

app.get("/", (req, res) => {
  res.send("Fresh Groceries API is running...");
});

/* ------------------ SERVER START ------------------ */

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
