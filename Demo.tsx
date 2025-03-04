"use client";

import { useForm, useFormContext, FormProvider } from "@nsk/form";
import { useEffect } from "react";

interface FormValues {
  name: string;
  email: string;
}

export default function MyFormWrapper() {
  const methods = useForm<FormValues>();

  return (
    <FormProvider {...methods}>
      <MyForm />
    </FormProvider>
  );
}

function MyForm() {
  const { register, handleSubmit, formState: { errors } } = useFormContext<FormValues>();

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [errors]);

  const onSubmit = (data: FormValues) => {
    console.log("Form Submitted", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <h2 className="text-red-500">{Object.keys(errors).length > 0 ? "Please fix errors below" : ""}</h2>

      <div>
        <label>Name:</label>
        <input {...register("name", { required: "Name is required" })} className={errors.name ? "border-red-500" : ""} />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
      </div>

      <div>
        <label>Email:</label>
        <input {...register("email", { required: "Email is required" })} className={errors.email ? "border-red-500" : ""} />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
      </div>

      <button type="submit" className="bg-blue-500 text-white px-4 py-2">Submit</button>
    </form>
  );
}



useEffect(() => {
  if (Object.keys(errors).length > 0) {
    const firstErrorField = document.querySelector("input[name='"+Object.keys(errors)[0]+"']") as HTMLElement;
    if (firstErrorField) {
      firstErrorField.scrollIntoView({ behavior: "smooth", block: "center" });
      firstErrorField.focus();
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" }); // Fallback if no input field found
    }
  }
}, [errors]);
