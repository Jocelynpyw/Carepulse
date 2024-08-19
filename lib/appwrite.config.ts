import * as sdk from "node-appwrite";
export const {
  PROJECT_ID,
  API_KEY,
  DATEBASE_ID,
  PATIENT_COLLECTION_ID,
  DOCTOR_COLLECTION_ID,
  APPOINTMENT_COLLECTION_ID,
  NEXT_PUBLIC_BUCKET_ID: BUCKET_ID,
  NEXT_PUBLIC_ENDPOINT: ENDPOINT,
} = process.env;

const client = new sdk.Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("66c2414a001845cebc33")
  .setKey(
    "5dd78cb85075a110419d727d669b29738ffc4e8ba48ba58bb386d5f07de5de503a7a3b2a0e503ce1b1803cb7b1541b1e8945244626c2308b788322e853b2ef01f3964d309b5c64736ee6c89664c028658181dd94aefba273b33fb1c1bbe678cea38a5bdb82d00ca1684a726bc32a6420c83abac36d35f28a6edfc8725ad97e5a"
  );
export const databases = new sdk.Databases(client);
export const storage = new sdk.Storage(client);
export const messaging = new sdk.Messaging(client);
export const users = new sdk.Users(client);
