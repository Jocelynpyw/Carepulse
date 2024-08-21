import { ID, Query, Storage } from "node-appwrite";
import { databases, storage, users } from "../appwrite.config";
import { parseStringify } from "../utils";
import { InputFile } from "node-appwrite/file";

export const createUser = async (user: CreateUserParams) => {
  try {
    //  console.log("le user est : ", user);
    const newUser = await users.create(
      ID.unique(),
      user.email,
      user.phone,
      undefined,
      user.name
    );
    console.log({ newUser });
    return parseStringify(newUser);
  } catch (error: any) {
    if (error && error?.code === 409) {
      const documents = await users.list([Query.equal("email", [user.email])]);
      return documents?.users[0];
    }
    console.error("An error occurred while creating a new user:", error);
  }
};

export const getUser = async (userId: string) => {
  try {
    const user = await users.get(userId);
  } catch (error) {
    console.log(error);
  }
};

export const registerPatient = async ({
  identificationDocument,
  ...patient
}: RegisterUserParams) => {
  try {
    let file;
    if (identificationDocument) {
      const inputFile = InputFile.fromBuffer(
        identificationDocument?.get("blobFile") as Blob,
        identificationDocument?.get("fileName") as string
      );

      file = await storage.createFile(
        "66c24389000d1e7c61bd",
        ID.unique(),
        inputFile
      );
    }

    const newPatient = await databases.createDocument(
      "66c242820011e0ac5d05",
      "66c242c1003c2bdf708c",
      ID.unique(),
      {
        identificationDocument: file?.$id || null,
        identificationDocumentUrl: `https://cloud.appwrite.io/v1/storage/buckets/66c24389000d1e7c61bd/files/${file?.$id}/view?project="66c2414a001845cebc33"`,
        ...patient,
      }
    );
    return parseStringify(newPatient);
  } catch (error) {
    console.log(error);
  }
};
