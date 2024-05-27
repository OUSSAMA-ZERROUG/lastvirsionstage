"use client";


import { useForm } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormMessage, Form } from "../ui/form"; // Assurez-vous que Button est correctement importé
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import Link from "next/link";

const FormSchema = z.object({
  UserID: z.string(),
  Password: z.string()
  .min(1, "password is required")
  .min(8, "password must have at least 8 characters"),

});

const signin = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit = (values:z.infer<typeof FormSchema>) => {
    console.log(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">

        <div className="space-y-2">

        <FormField
          control={form.control}
          name="UserID"
          render={({ field }) => (
            <FormItem>
              <FormLabel>UserID</FormLabel>
              <Input placeholder="Enter your UserID" {...field} />
              <FormMessage />
            </FormItem>
          )}
        />
       

        </div>
       
        <Button className="w-full mt-6" type="submit">Confirm</Button>
      </form>

      <div className="mx-auto my-4 flex w-full items-center justify-evently before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400">
        or
      </div>

       <p className="text-center text-sm text-gray-900 mt-2">
        Your rememeber your Password ?, please 

        <Link className='text-blue-500 hover:underline ml-2' href={'sign-in'} >
          Sign in
        </Link>
       </p>
    </Form>
  );
};

export default signin;

