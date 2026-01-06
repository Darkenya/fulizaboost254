export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const callbackData = req.body;

    // Log the callback data (in production, store in database)
    console.log('M-Pesa Callback Received:', JSON.stringify(callbackData, null, 2));

    // Process the callback
    if (callbackData.Body && callbackData.Body.stkCallback) {
      const stkCallback = callbackData.Body.stkCallback;
      const resultCode = stkCallback.ResultCode;
      const resultDesc = stkCallback.ResultDesc;
      const checkoutRequestID = stkCallback.CheckoutRequestID;

      if (resultCode === 0) {
        console.log(`Payment successful for CheckoutRequestID: ${checkoutRequestID}`);
        // Here you could update a database or send notification
      } else {
        console.log(`Payment failed for CheckoutRequestID: ${checkoutRequestID}, Reason: ${resultDesc}`);
      }
    }

    // Respond to Safaricom
    res.status(200).json({ success: true });

  } catch (error) {
    console.error('Callback processing error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}