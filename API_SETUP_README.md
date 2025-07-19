# API Configuration Setup Guide

This guide explains how to set up the React frontend to communicate with your localhost backend when deployed remotely.

## 🏗️ Architecture Overview

- **Frontend**: React app deployed remotely (e.g., Vercel, Netlify, GitHub Pages)
- **Backend**: .NET Core API running on localhost (https://localhost:7299)
- **Access Pattern**: User opens deployed frontend in browser on the same machine as the backend

## 📁 File Structure

```
demo-front/demo/
├── src/
│   ├── config/
│   │   └── api.ts              # Centralized API configuration
│   ├── services/
│   │   └── fingerprintService.ts # API service functions
│   └── api/
│       └── api.tsx             # Updated API testing component
├── env.development             # Development environment variables
├── env.production              # Production environment variables
└── API_SETUP_README.md         # This file
```

## 🔧 Environment Configuration

### Development Environment (env.development)
```bash
VITE_API_BASE_URL=https://localhost:7299
VITE_API_TIMEOUT=10000
VITE_ENVIRONMENT=development
```

### Production Environment (env.production)
```bash
VITE_API_BASE_URL=https://localhost:7299
VITE_API_TIMEOUT=15000
VITE_ENVIRONMENT=production
```

## 🚀 Setup Instructions

### 1. Backend CORS Configuration

Update your `Program.cs` to include your deployed domain:

```csharp
policy.WithOrigins(
    // Development origins
    "http://localhost:5173", 
    "http://localhost:5174", 
    "http://localhost:3000",
    "https://localhost:5173",
    "https://localhost:5174",
    "https://localhost:3000",
    // Production origins - REPLACE WITH YOUR ACTUAL DOMAIN
    "https://your-deployed-domain.com",
    "https://www.your-deployed-domain.com"
)
```

### 2. Environment Variables Setup

#### For Development:
```bash
# Copy the development environment file
cp env.development .env.development
```

#### For Production:
```bash
# Copy the production environment file
cp env.production .env.production
```

### 3. Build and Deploy

#### Development:
```bash
npm run dev
```

#### Production Build:
```bash
npm run build
```

## 🔍 API Configuration Features

### Centralized Configuration (`src/config/api.ts`)
- Environment-based API URLs
- Request/response interceptors for logging
- Error handling and debugging
- Timeout configuration
- Development vs production settings

### Service Layer (`src/services/fingerprintService.ts`)
- Type-safe API calls
- Centralized error handling
- Connection testing utilities
- Reusable service functions

### Updated API Component (`src/api/api.tsx`)
- Real-time configuration display
- Connection testing
- Enhanced error reporting
- Environment-aware logging

## 🌐 CORS Considerations

### Why This Works
When your React app is deployed remotely but accessed from the same machine as your backend:
1. The browser runs the JavaScript from the remote server
2. The JavaScript makes requests to `localhost` (same machine)
3. CORS allows this because the origin is in the allowed list

### Important Notes
- **Security**: Only works when accessing from the same machine as the backend
- **CORS**: Backend must explicitly allow your deployed domain
- **HTTPS**: Use HTTPS for production deployments
- **Localhost**: Backend must be accessible via `localhost` or `127.0.0.1`

## 🛠️ Troubleshooting

### Common Issues

1. **CORS Errors**
   - Ensure your deployed domain is in the CORS allowed origins
   - Check that the backend is running and accessible

2. **Connection Refused**
   - Verify backend is running on the correct port
   - Check firewall settings
   - Ensure HTTPS certificates are valid for localhost

3. **Environment Variables Not Loading**
   - Ensure `.env` files are in the correct location
   - Restart the development server after changes
   - Check that variables start with `VITE_`

### Debug Steps

1. **Check API Configuration**
   - Open browser console
   - Look for the API configuration display
   - Verify the base URL is correct

2. **Test Connection**
   - Use the "Test Connection" button in the UI
   - Check browser network tab for failed requests
   - Verify backend logs for incoming requests

3. **Environment Verification**
   ```javascript
   // In browser console
   console.log(import.meta.env.VITE_API_BASE_URL);
   console.log(import.meta.env.VITE_ENVIRONMENT);
   ```

## 📝 Best Practices

1. **Environment Management**
   - Use different `.env` files for different environments
   - Never commit sensitive data to version control
   - Use descriptive variable names

2. **Error Handling**
   - Implement proper error boundaries in React
   - Log errors appropriately for debugging
   - Provide user-friendly error messages

3. **Security**
   - Validate all API responses
   - Implement proper authentication if needed
   - Use HTTPS in production

4. **Performance**
   - Implement request caching where appropriate
   - Use appropriate timeouts
   - Monitor API response times

## 🔄 Deployment Checklist

- [ ] Update CORS origins with your actual domain
- [ ] Set environment variables in your deployment platform
- [ ] Ensure backend is running and accessible
- [ ] Test connection from deployed frontend
- [ ] Verify HTTPS certificates for localhost
- [ ] Check browser console for any errors

## 📞 Support

If you encounter issues:
1. Check the browser console for error messages
2. Verify the backend is running and accessible
3. Test the connection using the built-in test button
4. Review the CORS configuration in your backend
5. Ensure environment variables are properly set 