import express from "express";
import paymentRoutes from "./routes/payment.routes";
const app = express();
import { errorHandler } from "./middleware/error.middleware";


app.use(express.json());

app.use("/api/v1/payments", paymentRoutes);



app.use(errorHandler);
app.get("/health", (_req, res) => {
  res.json({
    success: true,
    message: "Payment API is running"
  });
});

export default app;