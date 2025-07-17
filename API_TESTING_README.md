# API Testing Project

This project provides a simple React frontend interface to test GET and POST requests to your localhost:5000 server.

## Features

- **GET Request Testing**: Simple button to test GET requests
- **POST Request Testing**: Form with fields for name, email, and message
- **Real-time Response Display**: Shows server responses in formatted JSON
- **Error Handling**: Displays errors when requests fail
- **Loading States**: Visual feedback during request processing
- **CORS Support**: Backend server includes CORS middleware

## Project Structure

```
demo/
├── src/
│   ├── api/
│   │   └── api.tsx          # Main API testing interface
│   ├── App.tsx              # Main app component
│   └── main.tsx             # App entry point
├── server.js                # Express server for testing
├── server-package.json      # Server dependencies
└── package.json             # Frontend dependencies
```

## Setup Instructions

### 1. Start the Frontend (React App)

```bash
# Install frontend dependencies (if not already done)
npm install

# Start the development server
npm run dev
```

The frontend will be available at `http://localhost:5173`

### 2. Start the Backend Server

```bash
# Install server dependencies
npm install express cors

# Or if you want to use the server-package.json:
# cp server-package.json package.json
# npm install

# Start the server
node server.js
```

The server will be available at `http://localhost:5000`

## Usage

1. **Open the Frontend**: Navigate to `http://localhost:5173` in your browser
2. **Test GET Requests**: Click the "Send GET Request" button to test GET endpoints
3. **Test POST Requests**: Fill in the form fields and click "Send POST Request"
4. **View Responses**: Server responses will be displayed in formatted JSON below each section
5. **Check Errors**: Any errors will be displayed in a red error box

## Available Endpoints

The included server provides these endpoints:

- `GET /` - Returns a success message with timestamp
- `POST /` - Accepts JSON data and returns the received data
- `GET /test` - Additional test endpoint
- `POST /test` - Additional test endpoint for POST requests

## Customization

### Changing the Server URL

To test a different server, modify the `baseURL` variable in `src/api/api.tsx`:

```javascript
const baseURL = "http://your-server-url:port";
```

### Adding More Form Fields

To add more fields to the POST form, update the `postData` state in `src/api/api.tsx`:

```javascript
const [postData, setPostData] = useState({
  name: "",
  email: "",
  message: "",
  // Add your new fields here
  newField: ""
});
```

### Testing Different Endpoints

You can modify the API calls to test different endpoints:

```javascript
// For GET requests
const response = await axios.get(`${baseURL}/your-endpoint`);

// For POST requests
const response = await axios.post(`${baseURL}/your-endpoint`, postData);
```

## Troubleshooting

### Common Issues

1. **CORS Errors**: Make sure your server includes CORS middleware
2. **Connection Refused**: Ensure your server is running on port 5000
3. **Network Error**: Check that both frontend and backend are running

### Server Not Starting

If you get errors when starting the server:

```bash
# Install dependencies manually
npm install express cors

# Or use the server package.json
cp server-package.json package.json
npm install
```

### Frontend Not Loading

If the React app doesn't start:

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
npm run dev
```

## Development

### Adding New Features

1. **New Request Types**: Add new functions for PUT, DELETE, etc.
2. **Request Headers**: Modify axios calls to include custom headers
3. **File Upload**: Add file input and multipart/form-data handling
4. **Authentication**: Add authentication headers or tokens

### Styling

The interface uses inline styles for simplicity. For production, consider:
- Moving styles to CSS files
- Using a CSS framework like Tailwind CSS
- Implementing a design system

## License

MIT License - feel free to use and modify as needed. 