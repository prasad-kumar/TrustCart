const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const asyncCatchErrors = require("../middleware/asyncCatchErrors");

exports.processPayment = asyncCatchErrors( async (req, res, next) => {
    const myPayment = await stripe.paymentIntents.create({
        amount: req.body.amount,
        currency:"inr",
        metadata:{
            company: "TrustCart"
        },

    })

    res.status(200).json({
        success:true,
        client_secret:myPayment.client_secret
    })
})

exports.sendStripeApiKey = asyncCatchErrors( async (req, res, next) => {
    res.status(200).json({
        stripeApiKey:process.env.STRIPE_API_KEY
    })
})

