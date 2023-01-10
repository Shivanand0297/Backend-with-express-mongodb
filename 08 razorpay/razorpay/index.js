const express = require("express")
const Razorpay = require("razorpay");

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(express.static("./public"))

// app.get("/", (_req, res) => {
//   res.send("hi");
// });

app.post("/order", async (req, res) => {
  const { amount } = req.body;

  var instance = new Razorpay({
    key_id: "rzp_test_fRsJiqBMVm0ci9",
    key_secret: "BD3DaawBXsoeaVdcmXi6UnEy",
  });

  const order = await instance.orders.create({
    amount: amount * 100,
    currency: "INR",
    receipt: "receipt#1",
    notes: {
      key1: "value3",
      key2: "value2",
    },
  });

  res.send({
    success: true,
    amount,
    order,
  });
});

app.listen(4000, () => {
  console.log("app is listening at post 4000");
});
