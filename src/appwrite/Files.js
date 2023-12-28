import envconf from "../envConf/envconf";
import { Client, ID, Storage } from "appwrite";

export class DatabaseService {
    client = new Client();
    storage;

    constructor(){
        this.client
        .setEndpoint(envconf.appwriteApi)
        .setProject(envconf.appwriteProjectId);
    this.storage = new Storage(this.client);

    }

    async uploadFile(file){
        try {
            return await this.storage.createFile(
                envconf.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            throw error;
            return false;
        }
    }

    async deleteFile(fileId){
        try {
            await this.storage.deleteFile(
                envconf.appwriteBucketId,
                fileId
            )
            return true;
        } catch (error) {
            throw error;
            return false;
        }
    }

    getFilePreview(fileId){
        return this.storage.getFilePreview(
            conf.appwriteBucketId,
            fileId
        )
    }

}

const databaseService = new DatabaseService();
export default databaseService;