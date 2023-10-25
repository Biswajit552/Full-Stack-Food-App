const router = require("express").Router();
const admin = require("firebase-admin");
const db = admin.firestore();
const stripe = require("stripe")(process.env.STRIPE_KEY);
const express = require("express");



router.post("/add", async (req, res) => {
    try {
      const id = Date.now();
      const data = {
        hotelId: id,
        hotel_name: req.body.hotel_name,
        hotel_category: req.body.hotel_category,
        hotel_price: req.body.hotel_price,
        imageURL: req.body.imageURL,
      };
      const response = await db.collection("hotels").doc(`/${id}/`).set(data);
      return res.status(200).send({ success: true, data: response });
    } catch (err) {
      return res.send({ success: false, msg: `Error: ${err}` });
    }
  });

  router.get("/all", async (req, res) => {
    (async () => {
      try {
        let query = db.collection("hotels");
        let response = [];
        await query.get().then((querysnap) => {
          let docs = querysnap.docs;
          docs.map((doc) => {
            response.push({ ...doc.data() });
          });
          return response;
        });
        return res.status(200).send({ success: true, data: response });
      } catch (err) {
        return res.send({
          success: false,
          msg: `Error this can slove problem: ${err}`,
        });
      }
    })();
  });
  
  //delete a product in item section code
router.delete("/delete/:hotelId", async (req, res) => {
  const hotelId = req.params.hotelId;
  try {
    await db
      .collection("hotels")
      .doc(`/${hotelId}/`)
      .delete()
      .then((result) => {
        return res.status(200).send({ success: true, data: result });
      });
  } catch (err) {
    return res.send({ success: false, msg: `Error: ${err}` });
  }
});

//create a Booking
router.post("/addToBook/:userId", async (req, res) => {
  const userId = req.params.userId;
  const hotelId = req.body.hotelId;
  try {
    const doc = await db
      .collection("BookItems")
      .doc(`/${userId}/`)
      .collection("books")
      .doc(`/${hotelId}/`)
      .get();

    if (doc.data()) {
      const quantity = doc.data().quantity + 1;
      const updatedItem = await db
        .collection("BookItems")
        .doc(`/${userId}/`)
        .collection("books")
        .doc(`/${hotelId}/`)
        .update({ quantity });
      return res.status(200).send({ success: true, data: updatedItem });
    } else {
      const data = {
        hotelId: hotelId,
        hotel_name: req.body.hotel_name,
        hotel_category: req.body.hotel_category,
        hotel_price: req.body.hotel_price,
        imageURL: req.body.imageURL,
        quantity: 1,
      };

      const addBook = await db
        .collection("BookItems")
        .doc(`/${userId}/`)
        .collection("books")
        .doc(`/${hotelId}/`)
        .set(data);
      return res.status(200).send({ success: true, data: addBook });
    }
  } catch (err) {
    return res.send({ success: false, msg: `Error: ${err}` });
  }
});


//get all
router.get("/getBookItems/:user_id", async (req, res) => {
  const userId = req.params.user_id;
  (async () => {
    try {
      let query = db
        .collection("BookItems")
        .doc(`${userId}/`)
        .collection("books");
      let response = [];

      await query.get().then((querysnap) => {
        let docs = querysnap.docs;

        docs.map((doc) => {
          response.push({ ...doc.data() });
        });
        return response;
      });
      return res.status(200).send({ success: true, data: response });
    } catch (er) {
      return res.send({ success: false, msg: `Error :,${er}` });
    }
  })();
});

//update cart to increase and decrease the quantity

router.post("/updateBook/:user_id", async (req, res) => {
  const userId = req.params.user_id;
  const hotelId = req.query.hotelId;
  const type = req.query.type;

  try {
    const doc = await db
      .collection("BookItems")
      .doc(`/${userId}/`)
      .collection("books")
      .doc(`/${hotelId}/`)
      .get();

    if (doc.data()) {
      if (type === "increment") {
        const quantity = doc.data().quantity + 1;
        const updatedItem = await db
          .collection("BookItems")
          .doc(`/${userId}/`)
          .collection("books")
          .doc(`/${hotelId}/`)
          .update({ quantity });
        return res.status(200).send({ success: true, data: updatedItem });
      } else {
        if (doc.data().quantity === 1) {
          await db
            .collection("BookItems")
            .doc(`/${userId}/`)
            .collection("books")
            .doc(`/${hotelId}/`)
            .delete()
            .then((result) => {
              return res.status(200).send({ success: true, data: result });
            });
        } else {
          const quantity = doc.data().quantity - 1;
          const updatedItem = await db
            .collection("BookItems")
            .doc(`/${userId}/`)
            .collection("books")
            .doc(`/${hotelId}/`)
            .update({ quantity });
          return res.status(200).send({ success: true, data: updatedItem });
        }
      }
    }
  } catch (err) {
    return res.send({ success: false, msg: `Error: ${err}` });
  }
});


router.post("/create-checkout-session", async (req, res) => {
  const customer = await stripe.customers.create({
    metadata: {
      user_id: req.body.data.user.user_id,
      book: JSON.stringify(req.body.data.book),
      total: req.body.data.total,
    },
  });

  const line_items = req.body.data.book.map((item) => {
    return {
      price_data: {
        currency: "inr",
        product_data: {
          name: item.hotel_name,
          images: [item.imageURL],
          metadata: {
            id: item.hotelId,
          },
        },
        unit_amount: item.hotel_price * 100,
      },
      quantity: item.quantity,
    };
  });
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    shipping_address_collection: { allowed_countries: ["IN"] },
    shipping_options: [
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: { amount: 0, currency: "inr" },
          display_name: "free shipping",
          delivery_estimate: {
            minimum: { unit: "hour", value: 2 },
            maximum: { unit: "hour", value: 4 },
          },
        },
      },
    ],
    phone_number_collection: {
      enabled: true,
    },
    line_items,
    customer: customer.id,
    mode: "payment",
    success_url: `${process.env.CLIENT_URL}/checkout-success`,
    cancel_url: `${process.env.CLIENT_URL}/`,
  });

  res.send({ url: session.url });
});


let endpointSecret;
//  endpointSecret = process.env.WEBHOOK_SECRET
router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  (req, res) => {
    const sig = req.headers["stripe-signature"];

    let eventType;
    let data;

    if (endpointSecret) {
      let event;
      try {
        event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
      } catch (err) {
        res.status(400).send(`Webhook Error: ${err.message}`);
        return;
      }
      data = event.data.object;
      eventType = event.type;
    } else {
      data = req.body.data.object;
      eventType = req.body.type;
    }

    // Handle the event
    if (eventType === "checkout.session.completed") {
      stripe.customers.retrieve(data.customer).then((customer) => {
        // console.log("customer details", customer);
        // console.log('Data',data);
        createOrder(customer, data, res);
      });
    }

    // Return a 200 res to acknowledge receipt of the event
    res.send().end();
  }
);

const createOrder = async (customer, intent, res) => {
  console.log("inside order");
  try {
    const bookingId = Date.now();
    const data = {
      intentId: intent.id,
      bookingId: bookingId,
      amount: intent.amount_total,
      created: intent.created,
      payment_method_types: intent.payment_method_types,
      status: intent.payment_status,
      customer: intent.customer_details,
      shipping_details: intent.shipping_details,
      userId: customer.metadata.user_id,
      items: JSON.parse(customer.metadata.book),
      total: customer.metadata.total,
      sts: "preparing",
    };
    await db.collection("Bookings").doc(`/${bookingId}/`).set(data);
    deleteCart(customer.metadata.user_id, JSON.parse(customer.metadata.book));
    console.log("******************************************");
    return res.status(200).send({ success: true });
  } catch (err) {
    console.log(err);
  }
};

const deleteCart = async (userId, items) => {
  console.log("inside delete");
  console.log(userId);
  console.log("**********************************************");
  items.map(async (data) => {
    console.log("-------------inside------------", userId, data.hotelId);
    await db
      .collection("BookItems")
      .doc(`/${userId}/`)
      .collection("books")
      .doc(`/${data.hotelId}/`)
      .delete()
      .then(() => console.log("------------success--------------"));
  });
};

//order

router.get("/Bookings", async (req, res) => {
  (async () => {
    try {
      let query = db.collection("Bookings");
      let response = [];
      await query.get().then((querysnap) => {
        let docs = querysnap.docs;
        docs.map((doc) => {
          response.push({ ...doc.data() });
        });
        return response;
      });
      return res.status(200).send({ success: true, data: response });
    } catch (err) {
      return res.send({
        success: false,
        msg: `Error this can slove problem: ${err}`,
      });
    }
  })();
});

// update the order
router.post("/updateBooking/:booking_id", async (req, res) => {
  const booking_id = req.params.booking_id;
  const sts = req.query.sts;
  try {
    const updatedItem = await db
      .collection("Bookings")
      .doc(`/${booking_id}/`)
      .update({ sts });
      console.log(sts)
    return res.status(200).send({ success: true, data: updatedItem });
    
  } 
  catch (er) {
    return res.send({ success: false, msg: `Error :,${er}` });
  }
});
module.exports = router;
