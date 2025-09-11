import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";

export class Authservice {
  client = new Client();
  account;
  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl) // Your API Endpoint
      .setProject(conf.projectId); // Your project ID
    this.account = new Account(this.client);
  }
  transformError(error) {
    const errorType = error.type;
    const errorCode = error.code;

    switch (errorType) {
      case "user_invalid_credentials":
        return {
          type: "INVALID_CREDENTIALS",
          message:
            "The email or password you entered is incorrect. Please try again.",
          field: null,
        };

      case "user_not_found":
        return {
          type: "USER_NOT_FOUND",
          message: "No account found with this email address.",
          field: "email",
        };

      case "user_blocked":
        return {
          type: "USER_BLOCKED",
          message:
            "Your account has been temporarily suspended. Please contact support.",
          field: null,
        };

      case "general_rate_limit_exceeded":
        return {
          type: "RATE_LIMITED",
          message:
            "Too many login attempts. Please wait a moment before trying again.",
          field: null,
        };

      case "user_password_mismatch":
        return {
          type: "PASSWORD_MISMATCH",
          message: "Incorrect password. Please try again.",
          field: "password",
        };

      case "user_email_not_whitelisted":
        return {
          type: "EMAIL_NOT_WHITELISTED",
          message: "This email is not authorized. Contact your administrator.",
          field: "email",
        };

      default:
        // Handle network errors and other cases
        if (
          error.message?.includes("network") ||
          error.message?.includes("fetch")
        ) {
          return {
            type: "NETWORK_ERROR",
            message:
              "Network error. Please check your connection and try again.",
            field: null,
          };
        }

        return {
          type: "UNKNOWN_ERROR",
          message: "Login failed. Please try again later or contact support.",
          field: null,
        };
    }
  }

  async createAccount({ email, password, firstName, gender }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        firstName,
        gender
      );
      if (userAccount) {
        return this.login({ email, password });
      }
      return userAccount;
    } catch (error) {
      console.log("Account Creation Failed", error);
      const transformedError = this.transformError(error);
      const enhancedError = new Error(transformedError.message);
      enhancedError.type = transformedError.type;
      enhancedError.field = transformedError.field;
      enhancedError.originalError = error;

      throw enhancedError;
    }
  }
  async login({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      console.log("Login To Account Failed", error);
      const transformedError = this.transformError(error);
      const enhancedError = new Error(transformedError.message);
      enhancedError.type = transformedError.type;
      enhancedError.field = transformedError.field;
      enhancedError.originalError = error;

      throw enhancedError;
    }
  }
  async logout() {
    try {
      await this.account.deleteSessions();
    } catch (error) {
      console.log("Appwrite service::Logout ::error", error);
    }
  }
  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log("Appwrite service::getCurrentUser ::error", error);
      throw error;
    }
  }
}
const authservice = new Authservice();
export default authservice;
