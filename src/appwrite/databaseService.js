import envconf from "../envConf/envconf";
import { Client, Databases, ID, Query } from "appwrite";

export class DatabaseService {
  client = new Client();
  databases;

  constructor() {
    this.client
      .setEndpoint(envconf.appwriteApi)
      .setProject(envconf.appwriteProjectId);
    this.databases = new Databases(this.client);
  }

  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      return await this.databases.createDocument(
        envconf.appwriteDatabaseID,
        envconf.appwriteCollectionId,
        ID.unique(),
        { title, slug, content, featuredImage, status, userId },
      );
    } catch (error) {
      throw error;
    }
  }

  async updatePost(id, { title,slug, content, featuredImage, status }) {
    try {
      return this.databases.updateDocument(
        envconf.appwriteDatabaseID,
        envconf.appwriteCollectionId,
        id,
        { title, slug, content, featuredImage, status },
      );
    } catch (error) {
      throw error;
    }
  }

  async deletePost(id) {
    try {
      await this.databases.deleteDocument(
        envconf.appwriteDatabaseID,
        envconf.appwriteCollectionId,
        id,
      );
      return true;
    } catch (error) {
      throw error;
      return false;
    }
  }

  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        envconf.appwriteDatabaseID,
        envconf.appwriteCollectionId,
        slug,
      );
    } catch (error) {
      throw error;
      return false;
    }
  }

  async getPosts(queries = [Query.equal("status", "public")]) {
    try {
      return await this.databases.listDocuments(
        envconf.appwriteDatabaseID,
        envconf.appwriteCollectionId,
        queries,
      );
    } catch (error) {
      throw error;
      return false;
    }
  }
}

const databaseService = new DatabaseService();
export default databaseService;
