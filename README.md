# Fuliza Boost

A web application to increase Fuliza limits via M-Pesa STK Push payments using Lipia Online.

## Features
- Select desired Fuliza limit
- Secure M-Pesa payment integration via Lipia Online
- Real-time payment verification
- Mobile-optimized UI

## Setup

1. **Clone the repository**
   ```bash
   git clone <repo-url>
   cd fuliza-master
   ```

2. **Install dependencies** (if using Node.js for local development)
   ```bash
   npm install
   ```

3. **Configure Lipia Online Credentials**
   - Update `api/initiate-payment.js` and `api/verify-payment.js` with your Lipia Online API key
   - Get your API key from Lipia Online dashboard

4. **Deploy to Vercel** (recommended for serverless functions)
   - Connect your GitHub repo to Vercel
   - The API routes will be available at `/api/*`

5. **Update Callback URL**
   - Set the callback URL in the API config to your deployed callback endpoint
   - Example: `https://your-app.vercel.app/api/callback`

## Usage

1. Open `index.html` in a browser
2. Select your desired Fuliza limit
3. Enter your ID number and M-Pesa phone number
4. Complete the M-Pesa STK Push payment
5. The app will verify the payment and confirm success

## API Endpoints

- `POST /api/initiate-payment` - Initiate STK Push via Lipia
- `GET /api/verify-payment` - Check payment status via Lipia
- `POST /api/callback` - Handle payment callbacks

## Security Notes

- Never expose API keys in client-side code
- Use HTTPS in production
- Validate all inputs server-side

## License

MIT