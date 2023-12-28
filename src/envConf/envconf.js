const envconf = ()=>{
    appwriteApi : String(import.meta.env.VITE_APPWRITE_API)
    appwriteProjectId : String(import.meta.env.VITE_APPWRITE_PROJECT_ID)
    appwriteDatabaseID : String(import.meta.env.VITE_APPWRITE_DATABASE_ID)
    appwriteCollectionId : String(import.meta.env.VITE_APPWRITE_COLLECTION_ID)
    appwriteBucketId : String(import.meta.env.VITE_APPWRITE_BUCKET_ID)
}

export default envconf;