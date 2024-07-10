"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import CustomFormField, { FormFieldType } from "@/components/CustomFormField"
import SubmitButton from "@/components/SubmitButton"
import { Form } from "@/components/ui/form"
import { createUser } from "@/lib/actions/patient.actions"
import { UserFormValidation } from "@/lib/validation"

const PatientForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false)
  // 1. Define your form.
  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  })

  // 2. Define a submit handler.
  async function onSubmit({ name, email, phone }: z.infer<typeof UserFormValidation>) {
    setIsLoading(true)    

    try {
      const userData = { name, email, phone };
      const user = await createUser(userData);
      if (user) router.push(`/patients/${user.$id}/register`);
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1 space-y-6">
        <section className="mb-12 space-y-4">
          <h1 className="header">Hi there</h1>
          <p className="text-dark-700">Schedule you first appointment.</p>
        </section>

        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="name"
          label="Full Name"
          iconSrc="/assets/icons/user.svg"
          iconAlt="user"
          placeholder="John Doe"
        />

        <CustomFormField 
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="email"
          label="Email"
          iconSrc="/assets/icons/email.svg"
          iconAlt="email"
          placeholder="johndoe@gmail.com"
        />

        <CustomFormField 
          fieldType={FormFieldType.PHONE_INPUT}
          control={form.control}
          name="phone"
          label="Phone Number"
          placeholder="(555) 123-4567"
        />
        <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
      </form>
    </Form>
  )
}

export default PatientForm