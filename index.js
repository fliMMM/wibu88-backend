const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const productRouter = require("./routes/product");
const authRouter = require("./routes/auth");

dotenv.config();
const PORT = process.env.PORT || 9999;

//connect to mongodb
async function connectDB() {
  try {
    await mongoose.connect(
      "mongodb+srv://pro0654:01257338888@wibu88.j9d7o.mongodb.net/wibu88?retryWrites=true&w=majority"
    );
    console.log("ket noi mongodb thanh cong");
  } catch (err) {
    console.log(err);
  }
}
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/products", productRouter);
app.use("/api/auth", authRouter);

app.listen(PORT, () => {
  console.log(`server is running at PORT: ${PORT}`);
});
