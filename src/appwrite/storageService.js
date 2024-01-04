import envconf from "../envConf/envconf";
import { Client, ID, Storage } from "appwrite";

export class StorageService {
  client = new Client();
  storage;

  constructor() {
    this.client
      .setEndpoint(envconf.appwriteApi)
      .setProject(envconf.appwriteProjectId);
    this.storage = new Storage(this.client);
  }

  async uploadFile(file) {
    try {
      return await this.storage.createFile(
        envconf.appwriteBucketId,
        ID.unique(),
        file,
      );
    } catch (error) {
      throw error;
      return false;
    }
  }

  async updateFile({featuredImage, newFile}) {
    try {
      await this.storage.updateFile(envconf.appwriteBucketId, featuredImage, newFile);
    } catch (error) {
      throw error;
      return false;
    }
  }

  async deleteFile(fileId) {
    try {
      await this.storage.deleteFile(envconf.appwriteBucketId, fileId);
      return true;
    } catch (error) {
      throw error;
      return false;
    }
  }

  getFilePreview(fileId) {
    return this.storage.getFilePreview(envconf.appwriteBucketId, fileId);
  }
}

const storageService = new StorageService();
export default storageService;
