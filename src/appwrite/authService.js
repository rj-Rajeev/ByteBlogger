import envconf from "../envConf/envconf";
import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(envconf.appwriteApi)
      .setProject(envconf.appwriteProjectId);
    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name,
      );
      if (userAccount) {
        return this.login({ email, password });
      } else {
        throw new Error("User Account Creation Failed")
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async login({ email, password }) {
    try {
      const userLogin = await this.account.createEmailSession(email, password);
      return userLogin;
    } catch (error) {
      console.log(error.message);
      throw new Error(error.message);
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log(error);
      throw new Error(error.message);
    }
  }

  async logout() {
    try {
      return await this.account.deleteSessions();
    } catch (error) {
      console.log(error);
      throw new Error(error.message);
    }
  }
}

const authService = new AuthService();

export default authService;
