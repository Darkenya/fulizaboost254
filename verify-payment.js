export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { reference } = req.query;

    if (!reference) {
      return res.status(400).json({ error: 'Reference is required' });
    }

    // Lipia Online Configuration
    const LIPIA_CONFIG = {
      apiKey: 'fbe8f7b7b8f124e87be00987a4ae2891ee738557'
    };

    // Call Lipia Online Status API (assuming it exists)
    const response = await fetch('https://lipia-online.vercel.app/api/v1/status', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        api_key: LIPIA_CONFIG.apiKey,
        reference: reference
      })
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || 'Payment verification failed');
    }

    // Map Lipia status to our format
    let status = 'pending';
    if (result.status === 'completed' || result.status === 'success') {
      status = 'completed';
    } else if (result.status === 'failed' || result.status === 'cancelled') {
      status = 'failed';
    }

    res.status(200).json({
      success: true,
      status: status,
      data: result
    });

  } catch (error) {
    console.error('Payment verification error:', error);
    res.status(500).json({ 
      error: error.message || 'Internal server error',
      success: false
    });
  }
}