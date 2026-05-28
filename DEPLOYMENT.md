# Ticket Verse - Vercel Deployment Guide

## Project Setup Complete ✅

Your Ticket Verse project is now fully configured for Vercel deployment.

## What Was Done

1. **Dependencies Installed & Fixed**
   - All npm packages installed
   - Security vulnerabilities fixed (npm audit fix)

2. **Vercel Configuration Files Created**
   - `vercel.json` - Vercel deployment configuration
   - `.env.example` - Environment variables template
   - `.gitignore` - Git ignore rules for sensitive files
   - `api/razorpay/order.js` - Serverless function for creating Razorpay orders
   - `api/razorpay/verify.js` - Serverless function for verifying payments
   - `local-server.js` - Local development server

3. **Updated Scripts**
   - `npm run dev` - Run local development server
   - `npm start` - Start local development server

## Local Development

To test locally before deploying to Vercel:

```bash
# Copy the example environment file
cp .env.example .env

# Add your Razorpay credentials to .env:
# RAZORPAY_KEY_ID=your_key_id
# RAZORPAY_KEY_SECRET=your_key_secret

# Start the development server
npm run dev

# Access your app at http://localhost:3000
```

## Deployment to Vercel

### Step 1: Prepare Your Git Repository

```bash
git add .
git commit -m "Setup Vercel deployment"
git push origin main
```

### Step 2: Create Vercel Account & Deploy

1. Go to [vercel.com](https://vercel.com)
2. Sign up or log in with your account
3. Click "Add New..." → "Project"
4. Select your Ticket_Verse repository from GitHub
5. Configure project settings:
   - Framework Preset: Other
   - Root Directory: ./
6. Add Environment Variables:
   - `RAZORPAY_KEY_ID` - Your Razorpay Key ID
   - `RAZORPAY_KEY_SECRET` - Your Razorpay Key Secret
7. Click "Deploy"

### Step 3: Verify Deployment

Once deployed, your app will be available at a URL like:
```
https://ticket-verse.vercel.app
```

### Step 4: Update API Endpoints (if needed)

If you're testing the Razorpay integration, update your frontend code to use the deployed URL:
- Order Creation: `POST https://your-app.vercel.app/api/razorpay/order`
- Payment Verification: `POST https://your-app.vercel.app/api/razorpay/verify`

## Environment Variables

Required environment variables on Vercel:

| Variable | Description |
|----------|-------------|
| `RAZORPAY_KEY_ID` | Your Razorpay public key |
| `RAZORPAY_KEY_SECRET` | Your Razorpay secret key |

## Project Structure

```
Ticket_Verse/
├── api/                    # Serverless functions
│   └── razorpay/
│       ├── order.js        # Create Razorpay order
│       └── verify.js       # Verify payment signature
├── scripts/                # Build scripts
│   └── build-events-data.py
├── index.html              # Main page
├── my-tickets.html         # User tickets page
├── payment.html            # Payment page
├── events-data.js          # Events data
├── site-config.js          # Site configuration
├── tickets.tsv             # Ticket data
├── local-server.js         # Local dev server
├── package.json            # Dependencies
├── vercel.json             # Vercel configuration
├── .env.example            # Environment template
└── .gitignore              # Git ignore rules
```

## Troubleshooting

### API Endpoints Not Working
- Verify environment variables are set correctly in Vercel dashboard
- Check Razorpay keys are valid
- Look at Vercel deployment logs for errors

### CORS Issues
- The serverless functions have CORS headers configured
- Ensure requests are made from the deployed domain

### Local Development Issues
- Make sure `.env` file exists in the root directory
- Verify all dependencies are installed: `npm install`
- Check that `local-server.js` is executable

## Next Steps

1. **Test locally first**: `npm run dev`
2. **Push to GitHub**: `git push`
3. **Deploy to Vercel**: Follow Step 2 above
4. **Monitor deployment**: Check Vercel dashboard for any errors
5. **Test payment flow**: Verify Razorpay integration on live URL

## Support

- [Vercel Docs](https://vercel.com/docs)
- [Express.js Docs](https://expressjs.com/)
- [Razorpay Integration Guide](https://razorpay.com/docs/)

---

**Your project is ready for deployment! 🚀**
