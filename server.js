const stripe = require("stripe")(
  "sk_test_51IgxBSIEUHKLgaEXMZafLc2jFySqYQx7fk5Mab5lBbK7UaJ9r3udO5BOuxpekNAJ98xUiog6WMa9wB55DelXB7ad00m5CmLMjc"
);
const express = require("express");
const app = express();
app.use(express.static("."));

const YOUR_DOMAIN = "http://localhost:4242";

app.post("/create-checkout-session", async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: "BH Connect Road Bike",
            images: [
              "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/010/437/original/bike.jpeg?1623258613",
            ],
          },
          unit_amount: 350000,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${YOUR_DOMAIN}/success.html`,
    cancel_url: `${YOUR_DOMAIN}/cancel.html`,
  });

  res.json({ id: session.id });
});

app.listen(4242, () => console.log("Running on port 4242"));
