import { api } from '../config/api';

// Types for fingerprint API
export interface FingerprintScanRequest {
  name?: string;
  email?: string;
  message?: string;
  // Add other fields as needed for your fingerprint scanning
}

export interface FingerprintScanResponse {
  success: boolean;
  message: string;
  data?: any;
  // Add other response fields as needed
}

// API endpoints
const ENDPOINTS = {
  SCAN: '/api/fingerprint/scan',
  STATUS: '/api/fingerprint/status',
  // Add other endpoints as needed
} as const;

// Fingerprint API service
export const fingerprintService = {
  /**
   * Scan fingerprint
   */
  async scanFingerprint(data?: FingerprintScanRequest): Promise<FingerprintScanResponse> {
    try {
      const response = await api.post<FingerprintScanResponse>(ENDPOINTS.SCAN, data);
      return response.data;
    } catch (error) {
      console.error('Fingerprint scan error:', error);
      throw error;
    }
  },

  /**
   * Get fingerprint scan status
   */
  async getScanStatus(): Promise<FingerprintScanResponse> {
    try {
      const response = await api.get<FingerprintScanResponse>(ENDPOINTS.SCAN);
      return response.data;
    } catch (error) {
      console.error('Get scan status error:', error);
      throw error;
    }
  },

  /**
   * Test API connectivity
   */
  async testConnection(): Promise<{ connected: boolean; message: string }> {
    try {
      const response = await api.get(ENDPOINTS.SCAN);
      return {
        connected: true,
        message: response.data?.message || 'API connection successful',
      };
    } catch (error: any) {
      return {
        connected: false,
        message: error.response?.data?.message || error.message || 'API connection failed',
      };
    }
  },
};

// Export default for convenience
export default fingerprintService; 