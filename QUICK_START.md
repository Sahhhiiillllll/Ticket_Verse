# 🚀 Quick Start - Deploy to Vercel

## Prerequisites
- Vercel account (sign up at [vercel.com](https://vercel.com))
- Razorpay API Keys (from your Razorpay dashboard)
- Git repository with this code pushed to GitHub

## One-Time Setup (5 minutes)

### 1. Create .env file for local testing
```bash
cp .env.example .env
# Edit .env and add your Razorpay credentials
```

### 2. Test locally (optional)
```bash
npm run dev
# Open http://localhost:3000
```

### 3. Push to GitHub
```bash
git add .
git commit -m "Ready for Vercel deployment"
git push origin main
```

## Deploy to Vercel (3 minutes)

### Method 1: Vercel Dashboard (Easiest)
1. Go to [vercel.com](https://vercel.com)
2. Log in → Click "Add New" → "Project"
3. Select your GitHub repository
4. In Environment Variables, add:
   ```
   RAZORPAY_KEY_ID=your_actual_key_id
   RAZORPAY_KEY_SECRET=your_actual_key_secret
   ```
5. Click "Deploy" - Done! ✅

### Method 2: Vercel CLI
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Add environment variables when prompted
# Follow the deployment wizard
```

## Verify Deployment
- Your app will be live at: `https://your-project.vercel.app`
- Test the API endpoints:
  - POST `/api/razorpay/order`
  - POST `/api/razorpay/verify`

## Troubleshooting

| Issue | Solution |
|-------|----------|
| "RAZORPAY_KEY_ID not found" | Add env vars in Vercel dashboard Settings → Environment Variables |
| 502 Bad Gateway | Check Vercel logs (Vercel dashboard → Deployments → Logs) |
| CORS errors | Already configured in API routes |
| Local testing fails | Make sure .env file exists with valid keys |

## Need Help?
- See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed guide
- Check Vercel docs: https://vercel.com/docs
- View deployment logs in Vercel dashboard

---
**That's it! Your Ticket Verse app is now live on Vercel! 🎉**
