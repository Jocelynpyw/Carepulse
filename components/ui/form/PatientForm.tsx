"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import CustomFormField from "@/components/CustomFormField";
import SubmitButton from "@/components/SubmitButton";
import { useState } from "react";
import { UserFormatValidation } from "@/lib/validation";
import { log } from "console";
import { useRouter } from "next/navigation";

export enum FormFieldType {
  INPUT = "input",
  CHECKBOX = "checkbox",
  TEXTAREA = "textarea",
  PHONE_INPUT = "phoneInput",
  SELECT = "select",
  RADIO = "radio",
  DATE_PICKER = "datePicker",
  SKELETON = "skeleton",
}

const PatientForm = () => {
  const router = useRouter();
  const [isLoading, setIsloading] = useState(false);
  const form = useForm<z.infer<typeof UserFormatValidation>>({
    resolver: zodResolver(UserFormatValidation),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  async function onSubmit({
    name,
    email,
    phone,
  }: z.infer<typeof UserFormatValidation>) {
    setIsloading(true);
    try {
      const userDate = { name, email, phone };
      console.log("le user est : ", userDate);
      //const user = await createUser(userData);

      //  if (user) router.push(`/patient/${user.$id}/register`);
    } catch (error) {
      console.log(error);
    }
    //console.log(values);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
        <section className="mb-12 space-y-4">
          <h1 className="header">Hi there 👋</h1>
          <p className="text-dark-700">Schedule your first appointment</p>
        </section>
        <CustomFormField
          control={form.control}
          fieldType={FormFieldType.INPUT}
          name="name"
          label="Nom complet"
          placeholder="Joceyn pyw"
          iconSrc="/assets/icons/user.svg"
          iconAlt="user"
        />
        <CustomFormField
          control={form.control}
          fieldType={FormFieldType.INPUT}
          name="email"
          label="Email"
          placeholder="jocelyn@cesi.fr"
          iconSrc="/assets/icons/email.svg"
          iconAlt="email"
        />
        <CustomFormField
          control={form.control}
          fieldType={FormFieldType.PHONE_INPUT}
          name="phone"
          label="Numéro de téléphone"
          placeholder="(+33) 07 45 67 88"
        />
        <SubmitButton isLoading={isLoading}>Commencer</SubmitButton>
      </form>
    </Form>
  );
};

export default PatientForm;
