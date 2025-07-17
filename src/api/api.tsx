import axios from "axios";
import { useState } from "react";

const API = () => {
  const [getResponse, setGetResponse] = useState<any>(null);
  const [postResponse, setPostResponse] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [postData, setPostData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const baseURL = "https://localhost:7299/api/fingerprint/scan";

  const handleGetRequest = async () => {
    setLoading(true);
    setError(null);
    setGetResponse(null);

    try {
      const response = await axios.get(baseURL);
      setGetResponse(response.data);
    } catch (err: any) {
      setError(`GET Error: ${err.message}`);
      console.error("GET Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handlePostRequest = async () => {
    setLoading(true);
    setError(null);
    setPostResponse(null);

    try {
      const response = await axios.post(baseURL, postData);
      setPostResponse(response.data);
    } catch (err: any) {
      setError(`POST Error: ${err.message}`);
      console.error("POST Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPostData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <h1 style={{ textAlign: "center", color: "#333", marginBottom: "30px" }}>
        API Testing Interface
      </h1>
      
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
        {/* GET Request Section */}
        <div style={{ 
          border: "1px solid #ddd", 
          borderRadius: "8px", 
          padding: "20px",
          backgroundColor: "#f9f9f9"
        }}>
          <h2 style={{ color: "#2c5aa0", marginBottom: "15px" }}>GET Request</h2>
          <p style={{ color: "#666", marginBottom: "15px" }}>
            Test GET request to: <code>{baseURL}</code>
          </p>
          
          <button 
            onClick={handleGetRequest}
            disabled={loading}
            style={{
              backgroundColor: "#4CAF50",
              color: "white",
              padding: "10px 20px",
              border: "none",
              borderRadius: "4px",
              cursor: loading ? "not-allowed" : "pointer",
              fontSize: "14px"
            }}
          >
            {loading ? "Loading..." : "Send GET Request"}
          </button>

          {getResponse && (
            <div style={{ marginTop: "15px" }}>
              <h3 style={{ color: "#333", marginBottom: "10px" }}>Response:</h3>
              <pre style={{ 
                backgroundColor: "#f4f4f4", 
                padding: "10px", 
                borderRadius: "4px",
                overflow: "auto",
                maxHeight: "200px"
              }}>
                {JSON.stringify(getResponse, null, 2)}
              </pre>
            </div>
          )}
        </div>

        {/* POST Request Section */}
        <div style={{ 
          border: "1px solid #ddd", 
          borderRadius: "8px", 
          padding: "20px",
          backgroundColor: "#f9f9f9"
        }}>
          <h2 style={{ color: "#2c5aa0", marginBottom: "15px" }}>POST Request</h2>
          <p style={{ color: "#666", marginBottom: "15px" }}>
            Test POST request to: <code>{baseURL}</code>
          </p>
          
          <div style={{ marginBottom: "15px" }}>
            <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
              Name:
            </label>
            <input
              type="text"
              name="name"
              value={postData.name}
              onChange={handleInputChange}
              style={{
                width: "100%",
                padding: "8px",
                border: "1px solid #ddd",
                borderRadius: "4px",
                fontSize: "14px"
              }}
              placeholder="Enter name"
            />
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
              Email:
            </label>
            <input
              type="email"
              name="email"
              value={postData.email}
              onChange={handleInputChange}
              style={{
                width: "100%",
                padding: "8px",
                border: "1px solid #ddd",
                borderRadius: "4px",
                fontSize: "14px"
              }}
              placeholder="Enter email"
            />
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
              Message:
            </label>
            <textarea
              name="message"
              value={postData.message}
              onChange={handleInputChange}
              style={{
                width: "100%",
                padding: "8px",
                border: "1px solid #ddd",
                borderRadius: "4px",
                fontSize: "14px",
                minHeight: "60px",
                resize: "vertical"
              }}
              placeholder="Enter message"
            />
          </div>

          <button 
            onClick={handlePostRequest}
            disabled={loading}
            style={{
              backgroundColor: "#2196F3",
              color: "white",
              padding: "10px 20px",
              border: "none",
              borderRadius: "4px",
              cursor: loading ? "not-allowed" : "pointer",
              fontSize: "14px"
            }}
          >
            {loading ? "Loading..." : "Send POST Request"}
          </button>

          {postResponse && (
            <div style={{ marginTop: "15px" }}>
              <h3 style={{ color: "#333", marginBottom: "10px" }}>Response:</h3>
              <pre style={{ 
                backgroundColor: "#f4f4f4", 
                padding: "10px", 
                borderRadius: "4px",
                overflow: "auto",
                maxHeight: "200px"
              }}>
                {JSON.stringify(postResponse, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div style={{ 
          marginTop: "20px", 
          padding: "15px", 
          backgroundColor: "#ffebee", 
          border: "1px solid #f44336",
          borderRadius: "4px",
          color: "#c62828"
        }}>
          <strong>Error:</strong> {error}
        </div>
      )}

      {/* Instructions */}
      <div style={{ 
        marginTop: "30px", 
        padding: "20px", 
        backgroundColor: "#e3f2fd", 
        borderRadius: "8px",
        border: "1px solid #2196F3"
      }}>
        <h3 style={{ color: "#1976d2", marginBottom: "10px" }}>Instructions:</h3>
        <ul style={{ margin: 0, paddingLeft: "20px", color: "#333" }}>
          <li>Make sure your server is running on <code>https://localhost:7299</code></li>
          <li>Click "Send GET Request" to test the GET endpoint</li>
          <li>Fill in the form and click "Send POST Request" to test the POST endpoint</li>
          <li>Check the browser console for additional error details</li>
        </ul>
      </div>
    </div>
  );
};

export default API;