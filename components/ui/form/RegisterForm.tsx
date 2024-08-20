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
import { createUser } from "@/lib/actions/patient.action";
import { FormFieldType } from "./PatientForm";
import { RadioGroup } from "@radix-ui/react-radio-group";
import { Doctors, GenderOptions } from "@/constants";
import { RadioGroupItem } from "../radio-group";
import { SelectItem } from "@radix-ui/react-select";
import Image from "next/image";

const RegisterForm = ({ user }: { user: User }) => {
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
      const userData = { name, email, phone };
      //console.log("le user est : ", userData);
      const user = await createUser(userData);

      if (user) router.push(`/patients/${user.$id}/register`);
    } catch (error) {
      console.log(error);
    }
    //console.log(values);
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-12 flex-1"
      >
        <section className="space-y-4">
          <h1 className="header">Bienvenue</h1>
          <p className="text-dark-700">Laissez nous en savoir plus sur vous.</p>
        </section>
        <section className="space-y-6">
          <div className="mb-9 space-y-1"></div>
          <h2 className="sub-header">Information personnelle</h2>
        </section>
        <CustomFormField
          control={form.control}
          fieldType={FormFieldType.INPUT}
          name="name"
          label="Nom Complet"
          placeholder="Joceyn pyw"
          iconSrc="/assets/icons/user.svg"
          iconAlt="user"
        />

        <div className="flex flex-col gap-6 xl:flex-row">
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
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.DATE_PICKER}
            name="birthDate"
            label="Date de naissance"
          />
          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.SKELETON}
            name="gender"
            label="Genre"
            renderSkeleton={(field) => (
              <FormControl>
                <RadioGroup
                  className="flex h-11 gap-6 xl:justify-between"
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  {GenderOptions.map((option) => (
                    <div key={option} className="radio-group ">
                      <RadioGroupItem value={option} id={option} />
                      <label className="cursor-pointer" htmlFor={option}>
                        {option}
                      </label>
                    </div>
                  ))}
                </RadioGroup>
              </FormControl>
            )}
          />
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.INPUT}
            name="address"
            label="Address"
            placeholder="11 avenue du clocher, Noisy-Le-Sec"
          />
          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.INPUT}
            name="occupation"
            label="Occupation"
            placeholder="ingénieur logiciel"
          />
        </div>
        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.INPUT}
            name="emergencyContactName"
            label="Contacter en cas d'urgence"
            placeholder="Parfait Yem"
          />
          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.PHONE_INPUT}
            name="emergencyContactNumber"
            label="Numéro en cas d'urgence"
            placeholder="(+33) 07 45 67 88"
          />
        </div>

        <section className="space-y-6">
          <div className="mb-9 space-y-1"></div>
          <h2 className="sub-header">Information Medicale</h2>
        </section>
        <CustomFormField
          control={form.control}
          fieldType={FormFieldType.SELECT}
          name="primaryPhysician"
          label="Médecin principal"
          placeholder="Selectionnez un médecin "
        >
          {Doctors.map((doctor) => (
            <SelectItem key={doctor.name} value={doctor.name}>
              <div className="flex cursor-pointer items-center gap-2">
                <Image
                  src={doctor.image}
                  width={32}
                  height={32}
                  alt={doctor.name}
                  className="rounded-full border border-dark-500"
                />
                <p>{doctor.name}</p>
              </div>
            </SelectItem>
          ))}
        </CustomFormField>

        <div className="flex flex-col gap-6 xl:flex-row"></div>

        <SubmitButton isLoading={isLoading}>Commencer</SubmitButton>
      </form>
    </Form>
  );
};

export default RegisterForm;
