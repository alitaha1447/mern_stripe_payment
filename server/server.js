const express = require("express");
const mongoose = require("mongoose");
const cookieParse = require("cookie-parser");
const cors = require("cors");
const app = express();
const stripe = require("stripe")(
  "sk_test_51OwN4hSHLsSvU0ECiWdSvMp3t20ius4GofV30EVNcF8tpJNwMWI6BxgusKaiKKpcLalivpEcxZ0fWY6ndLTFltHJ00nXf2zs27"
);

app.use(express.json());
app.use(cors());

// checkout api
app.post("/api/create-checkout-session", async (req, res) => {
  const { products } = req.body;

  const lineItems = products.map((product) => ({
    price_data: {
      currency: "inr",
      product_data: {
        name: product.dish,
        images: [product.imgdata],
      },
      unit_amount: product.price * 100,
    },
    quantity: product.qnty,
  }));

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    line_items: lineItems,
    success_url:"http://localhost:5173/success",
    cancel_url:"http://localhost:5173/cancel",
    payment_method_types: ['card'],
    shipping_address_collection: {
      allowed_countries: ['IN'],
    },
  });
  console.log('sessionId',session.id)
  res.json({ id: session.id });
});

const PORT = 5000;

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));