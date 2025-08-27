import { Client, Account, ID } from "appwrite";

const appwriteUrl = import.meta.env.VITE_APPWRITE_URL;
const appwriteProjectId = import.meta.env.VITE_APPWRITE_PROJECT_ID;

class AuthService {
  client = new Client();
  account;

  constructor() {
    if (!appwriteUrl || !appwriteProjectId) {
      console.error("Missing Appwrite environment variables");
      throw new Error("Missing Appwrite environment variables");
    }
    
    try {
      this.client.setEndpoint(appwriteUrl).setProject(appwriteProjectId);
      this.account = new Account(this.client);
      console.log("Appwrite client initialized successfully");
    } catch (error) {
      console.error("Failed to initialize Appwrite client:", error);
      throw error;
    }
  }

  

  async createAccount({ email, password, name }) {
    try {
      // Create user account
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      
      if (userAccount) {
        // If account creation is successful, create email session (login)
        await this.account.createEmailPasswordSession(email, password);
        return userAccount;
      }
    } catch (error) {
      console.error("Appwrite createAccount error:", error);
      throw new Error(error.message || "Failed to create account");
    }
  }

  async login({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      console.error("Appwrite login error:", error);
      throw new Error(error.message || "Login failed");
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log("No active user session:", error.message);
      return null;
    }
  }
  

  async logout() {
  try {
    await this.account.deleteSessions();
    return true;
  } catch (error) {
    console.error("Appwrite logout error:", error);
    return true;
  }
}
}

let authService;

try {
  authService = new AuthService();
} catch (error) {
  console.error("Failed to initialize AuthService:", error);
  // Create a mock service for development
  authService = {
    createAccount: async ({ email, name }) => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      return {
        $id: `mock-user-${Date.now()}`,
        name: name,
        email: email,
        emailVerification: false
      };
    },
    login: async () => ({ $id: "mock-session-id" }),
    getCurrentUser: async () => null,
    logout: async () => {},
  };
}

export default authService;