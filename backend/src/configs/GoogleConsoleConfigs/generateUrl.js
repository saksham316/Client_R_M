import { Storage } from "@google-cloud/storage";
import { Buffer } from "buffer";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";

// ---------------------------------------------------------------------------------------------------
const __dirname = dirname(fileURLToPath(import.meta.url));
let keyFilename = "./nifty-depth-407105-b5748dc77282.json";
keyFilename = path.join(__dirname, keyFilename);
const storage = new Storage({ keyFilename });

const bucketName = "project-crm";
const folderName = "Avatars";
// console.log("This is keyname", keyFilename);

// ---------------------------------------------------------------------------------------------------

export const urlProvider = async (fileBuffer, fileName) => {
  try {
    // console.log("Entered here for the 1st time")
    const file = storage.bucket(bucketName).file(`${folderName}/${fileName}`);
    // Upload the buffer to Google Cloud Storage
    const cloudConnect = await file.save(fileBuffer, (err) => {
      if (err) {
        console.error("Error uploading the file:", err);
        return { error: 0 };
        // throw err; // terminate execution on error
      } else {
        console.log("Media file has been uploaded successfully!");
        // return { error: 11 }
      }
    });
    if (cloudConnect?.error == 0) {
      return { error: 0 };
    }
    // console.log("This  is file.name", file?.name)
    const publicUrl = `https://storage.googleapis.com/${bucketName}/${file.name}`;

    const wrappedDetails = {
      publicUrl,
    };
    return wrappedDetails;
  } catch (error) {
    console.error("Error inside this", error);
    return { error: 0 };
  }
};
