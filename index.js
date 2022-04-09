const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const productRouter = require("./routes/product");
const authRouter = require("./routes/auth");

const app = express();
app.use(express.json());
app.use(cors());

dotenv.config();
const PORT = process.env.PORT || 9999;

//connect to mongodb
async function connectDB() {
  try {
    await mongoose.connect(
      process.env.MONGOOSE_URL
    );
    console.log("ket noi mongodb thanh cong");
  } catch (err) {
    console.log(err);
  }
}
connectDB();



app.use("/api/products", productRouter);
app.use("/api/auth", authRouter);


app.listen(PORT, () => {
  console.log(`server is running at PORT: ${PORT}`);
});
