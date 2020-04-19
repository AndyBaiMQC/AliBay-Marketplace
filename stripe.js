const stripe = require('stripe')('sk_test_s0FYhFBESMT2Ld07TZReUUPx00PwadmhQ0');

async function postCharge(req, res) {
  try {
    const {amount, source, receipt_email} = req.body;

    const charge = await stripe.charges.create({
      amount,
      currency: 'usd',
      source,
      receipt_email,
    });

    if (!charge) throw new Error('charge unsuccessful');

    res.status(200).json({
      message: 'charge posted successfully',
      charge,
    })
  } catch (error) {
    res.status(500).json({
      message: error.message,
    })
  }
}

module.exports = postCharge
