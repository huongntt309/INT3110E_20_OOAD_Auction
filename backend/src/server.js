import express from "express";
import sqlite3 from "sqlite3";
import { open } from "sqlite";
require("dotenv").config();
import accountRoutes from "./routes/accountRoutes";
import auctionRoutes from "./routes/auctionRoutes";
import bidRoutes from "./routes/bidRoutes";
import paymentRoutes from "./routes/paymentRoutes";

const app = express();

const port = process.env.PORT || 8081;
const dbPath = process.env.DB_PATH; // Đường dẫn tới file SQLite

// Middleware để xử lý dữ liệu
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cài đặt các API routes
app.use("/api/v1", accountRoutes);
app.use("/api/v1", auctionRoutes);
app.use("/api/v1", bidRoutes);
app.use("/api/v1", paymentRoutes);

// Khai báo db như một biến global
global.db = null;

// Khai báo hàm async để chạy ứng dụng
(async function () {
  try {
    // Mở kết nối tới cơ sở dữ liệu SQLite
    global.db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });

    console.log("Connected to SQLite");

    // Bắt đầu server
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error("Error connecting to SQLite:", error);
  }
})();

