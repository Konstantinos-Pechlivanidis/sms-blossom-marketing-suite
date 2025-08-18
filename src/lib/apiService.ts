import { api } from '@/lib/api';
import { currentUser as MOCK_USER } from '@/data/mock-data';
import type { User, PasswordUpdatePayload, UserCredentials, UserRegistrationInfo } from '@/types';

// This object centralizes all API communication logic.
export const apiService = {
  /**
   * Fetches the currently authenticated user's data.
   */
  getCurrentUser: async (): Promise<User> => {
    console.log("API Service: Fetching current user...");
    await new Promise(resolve => setTimeout(resolve, 500));
    // REAL IMPLEMENTATION:
    // const { data } = await api.get('/me');
    // return data;
    return MOCK_USER;
  },

  /**
   * Updates the current user's profile information.
   */
  updateUser: async (userData: Partial<User>): Promise<User> => {
    console.log("API Service: Updating user profile with:", userData);
    await new Promise(resolve => setTimeout(resolve, 1000));
    // REAL IMPLEMENTATION:
    // const { data } = await api.patch('/me', userData);
    // return data;
    return { ...MOCK_USER, ...userData };
  },

  /**
   * Updates the current user's password.
   */
  updatePassword: async (passwordData: PasswordUpdatePayload): Promise<{ message: string }> => {
    console.log("API Service: Updating password...");
    await new Promise(resolve => setTimeout(resolve, 1500));
    // REAL IMPLEMENTATION:
    // const { data } = await api.post('/me/change-password', passwordData);
    // return data;
    return { message: "Password updated successfully!" };
  },

  /**
   * Logs the user in.
   */
  loginUser: async (credentials: UserCredentials): Promise<User> => {
    console.log("API Service: Logging in...");
    await new Promise(resolve => setTimeout(resolve, 1000));
    // REAL IMPLEMENTATION:
    // const { data } = await api.post('/login', credentials);
    // You would typically save the token here, e.g., dispatch(setToken(data.token));
    // return data.user;
    return MOCK_USER;
  },

  /**
   * Registers a new user.
   */
  registerUser: async (userInfo: UserRegistrationInfo): Promise<User> => {
    console.log("API Service: Registering user...");
    await new Promise(resolve => setTimeout(resolve, 1500));
    // REAL IMPLEMENTATION:
    // const { data } = await api.post('/register', userInfo);
    // return data.user;
    return MOCK_USER;
  },
  
  /**
   * Logs the user out.
   */
  logoutUser: async (): Promise<void> => {
    console.log("API Service: Sending logout request...");
    await new Promise(resolve => setTimeout(resolve, 500));
    // REAL IMPLEMENTATION:
    // await api.post('/logout');
    return;
  },
};