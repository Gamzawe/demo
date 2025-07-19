# Netlify Environment Variables Setup

## 🔧 **Required Environment Variables**

You need to set these environment variables in your Netlify dashboard:

### 1. Go to Netlify Dashboard
- Navigate to your site: https://app.netlify.com/sites/demo-arafat
- Go to **Site settings** → **Environment variables**

### 2. Add These Variables:

```
VITE_API_BASE_URL = https://localhost:7299
VITE_API_TIMEOUT = 15000
VITE_ENVIRONMENT = production
```

### 3. Steps to Add Variables:
1. Click **Add a variable**
2. Set **Key**: `VITE_API_BASE_URL`
3. Set **Value**: `https://localhost:7299`
4. Repeat for other variables
5. Click **Save**

## 🚀 **After Setting Variables:**

1. **Redeploy your site** (trigger a new build)
2. **Restart your backend** to pick up the new CORS settings
3. **Test the connection** from the deployed app

## 🔍 **Troubleshooting:**

### If still not working:
1. **Check browser console** for CORS errors
2. **Verify backend is running** on localhost:7299
3. **Test localhost connection** first
4. **Check Netlify build logs** for any errors

## 📋 **Verification Steps:**

1. ✅ Backend running on localhost:7299
2. ✅ CORS updated with your domain
3. ✅ Environment variables set in Netlify
4. ✅ Site redeployed
5. ✅ Test connection from deployed app 