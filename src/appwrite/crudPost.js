import envconf from "../envConf/envconf";
import { Client, Databases, ID, Query } from "appwrite";

export class StorageService {
    client = new Client();
    databases;

    constructor(){
        this.client
        .setEndpoint(envconf.appwriteApi)
        .setProject(envconf.appwriteProjectId);
    this.databases = new Databases(this.client);
    this.storage = new Storage(this.client);

    }

    async createPost({title, slug, content, featuredImage, status, userId}){
        try {
        return await this.databases.createDocument(envconf.appwriteDatabaseID, envconf.appwriteCollectionId, ID.unique(), {title, content, featuredImage, status, userId})
        } catch (error) {
            throw error;
        }
    }

    async updatePost(slug, {title, content, featuredImage, status, userId}){
        try {
            return this.databases.updateDocument(envconf.appwriteDatabaseID, envconf.appwriteCollectionId, slug, {title, content, featuredImage, status}) 
        } catch (error) {
            throw error;
        }
    }

    async deletePost(slug){
        try {
            await this.databases.deleteDocument(envconf.appwriteDatabaseID, envconf.appwriteCollectionId, slug)
            return true;
        } catch (error) {
            throw error;
            return false;
        }
    }

    async getPost(slug){
        try {
            return await this.databases.getDocument(envconf.appwriteDatabaseID, envconf.appwriteCollectionId, slug)

        } catch (error) {
            throw error;
            return false;
        }
    }

    async getPosts(queries = [Query.equal("status", true)]){
        try {
            return await this.databases.listDocuments(envconf.appwriteDatabaseID, envconf.appwriteCollectionId, queries)
        } catch (error) {
            throw error;
            return false;
        }
    }
}

const storageService = new StorageService();
export default storageService;