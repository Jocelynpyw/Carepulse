import { z } from "zod";

export const UserFormatValidation = z.object({
  name: z
    .string()
    .min(2, {
      message: "Le nom d'utilisateur doit comporter au moins 2 caractères.",
    })
    .max(50, {
      message: "Le nom d'utilisateur ne doit pas depasser 50 caractères.",
    }),
  email: z.string().email("Addresse email invalide"),
  phone: z
    .string()
    .refine(
      (phone) => /^(\+33|0)[1-9](?:[\s.-]*\d{2}){4}$/.test(phone),
      "Numéro de téléphone invalide"
    ),
});
