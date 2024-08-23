import { ID } from "node-appwrite";
import { databases } from "../appwrite.config";
import { parseStringify } from "../utils";

export const createAppointment = async (
  appointment: CreateAppointmentParams
) => {
  try {
    const newAppointment = await databases.createDocument(
      "66c242820011e0ac5d05",
      "66c2432b002c99706750",
      ID.unique(),
      appointment
    );
    return parseStringify(newAppointment);
  } catch (error) {
    console.log(error);
  }
};
