export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { phone_number, amount, loan_amount, id_number } = req.body;

    // Validate input
    if (!phone_number || !amount) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Lipia Online Configuration
    const LIPIA_CONFIG = {
      apiKey: 'fbe8f7b7b8f124e87be00987a4ae2891ee738557',
      shortCode: '4717390',
      callbackUrl: 'https://fulizaboost-five.vercel.app/callback'
    };

    // Call Lipia Online STK Push API
    const response = await fetch('https://lipia-online.vercel.app/api/v1/stk-push', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        api_key: LIPIA_CONFIG.apiKey,
        phone_number: phone_number,
        amount: amount.toString(),
        short_code: LIPIA_CONFIG.shortCode,
        callback_url: LIPIA_CONFIG.callbackUrl
      })
    });

    const result = await response.json();

    if (!response.ok || result.status !== 'success') {
      throw new Error(result.message || 'Payment initiation failed');
    }

    res.status(200).json({
      success: true,
      reference: result.reference || result.CheckoutRequestID || `REF-${Date.now()}`,
      external_reference: result.external_reference || `FLM-${Date.now()}`
    });

  } catch (error) {
    console.error('Payment initiation error:', error);
    res.status(500).json({ 
      error: error.message || 'Internal server error' 
    });
  }
}