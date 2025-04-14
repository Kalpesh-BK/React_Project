import { useEffect, useState } from 'react';
import { fetchFinpro } from '@/lib/fetchfinpro';

// 👇 Retry wrapper around fetchFinpro
async function fetchWithRetry(retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      const data = await fetchFinpro();
      if (data) return data;
    } catch (err) {
      if (i === retries - 1) throw err;
    }
    await new Promise(r => setTimeout(r, 1000)); // wait before retry
  }
}

export default function BusinessConcept() {
  const [data, setData] = useState(null);
  const [errorModal, setErrorModal] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWithRetry()
      .then(res => {
        setData(res);
      })
      .catch(() => {
        setErrorModal(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (errorModal) return <div>Error loading data. Please try again.</div>;

  return <div>{JSON.stringify(data)}</div>;
}





global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ ip: "192.168.1.1" }),
  })
);

"use client";
If you want to use value.replace() to restrict input to 2 decimal places, you can do it inside onChange.


---

🔧 Fixed Code (Using replace() for Decimal Places)

import { useState } from "react";

export default function NumberInput() {
  const [value, setValue] = useState("");

  return (
    <div>
      <label>Enter a number (max 100, up to 2 decimals):</label>
      <input
        type="text"
        value={value}
        onChange={(e) => {
          let inputValue = e.target.value;

          // Remove unwanted characters (allow numbers, single dot, and up to 2 decimals)
          inputValue = inputValue
            .replace(/[^0-9.]/g, "") // Remove non-numeric characters except "."
            .replace(/^(\d*\.?\d{0,2}).*$/, "$1"); // Limit to 2 decimal places

          let numValue = parseFloat(inputValue);

          // Ensure value does not exceed 100
          if (!isNaN(numValue) && numValue > 100) {
            inputValue = "100";
          }

          setValue(inputValue);
        }}
        placeholder="0.00"
      />
    </div>
  );
}


---

🚀 How This Works

✅ .replace(/[^0-9.]/g, "") → Removes everything except numbers and .
✅ .replace(/^(\d*\.?\d{0,2}).*$/, "$1") → Limits to 2 decimal places
✅ Instantly resets values over 100
✅ Prevents multiple dots (99..5 ❌, 99.99 ✅)


---

Example Scenarios

Now, it automatically corrects the input as the user types. 🚀

Would you like any further improvements?

  
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
