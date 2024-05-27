
"use client";

import { useForm } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormMessage, Form, FormControl } from "../ui/form"; // Assurez-vous que Button est correctement importé
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { toast, useToast } from "../ui/use-toast";

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{2,})?$/;
const FormSchema = z.object({
  fullName: z.string().trim().min(1, "Full name is required"),
  email: z
  .string()
  .refine((value) => emailRegex.test(value), {
    message: "Adresse e-mail invalide. Veuillez utiliser le format : firstname.middlename.lastname@gsk.com",
  }),
  UserID: z.string().trim().min(1, "UserID is required"),
  Password: z.string()
    .min(1, "Password is required")
    .min(8, "Password must have at least 8 characters"),
  role: z.enum(["Technicien", "RE", "Superviseur", "SuperAdmin", "Admin"]),
  garde: z.string().optional()

})



const signup = () => {
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });



  const onSubmit = async (values: z.infer<typeof FormSchema>) => {


    const response = await fetch('/api/auth', {

      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fullName: values.fullName,
        email: values.email,
        UserID: values.UserID,
        Password: values.Password,
        role: values.role,
        garde: values.garde,
      }),


    });


    if (response.ok) {

      router.push('sign-in')

    } else {

      toast({
        title: "Error",
        description: "Oops! this userID already exists please login",
        variant: "destructive"
      })


    }

  };



  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">

        <div className="space-y-2">

          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full name</FormLabel>
                <Input placeholder="Enter your full name" {...field} />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <Input placeholder="Enter your full name" {...field} />
                <FormMessage />
              </FormItem>
            )}
          />

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


          <FormField
            control={form.control}
            name="Password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <Input type="password" placeholder="Enter your Password" {...field} />
                <FormMessage />
              </FormItem>
            )}
          />




          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Role</FormLabel>
                <Select onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your Role" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Technicien">Technicien</SelectItem>
                    <SelectItem value="RE">RE</SelectItem>
                    <SelectItem value="Superviseur">Superviseur</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />


          <FormField
            control={form.control}
            name="garde"
            render={({ field }) => (
              <FormItem style={{ display: form.watch("role") === "Technicien" ? "block" : "none" }}>
                <FormLabel>Garde</FormLabel>
                <Select onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your Gard" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="AMS Oceasoft">AMS Oceasoft</SelectItem>
                    <SelectItem value="RIX">RIX</SelectItem>
                    <SelectItem value="PLC/SCADA">PLC/SCADA</SelectItem>
                    <SelectItem value="DCS">DCS</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />








        </div>

        <Button className="w-full mt-6" type="submit">Sign in</Button>
      </form>

      <div className="mx-auto my-4 flex w-full items-center justify-evently before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400">
        or
      </div>

      <p className="text-center text-sm text-gray-900 mt-2">
        Already have an acount ! please

        <Link className='text-blue-500 hover:underline ml-2' href={'sign-in'} >
          Sign in
        </Link>
      </p>
    </Form>
  );
};

export default signup;

