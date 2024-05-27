// "use client";

// import { useSession } from "next-auth/react";
// import { useForm } from "react-hook-form";
// import { FormField, FormItem, FormLabel, FormMessage, Form } from "../ui/form";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Input } from "../ui/input";
// import { Button } from "../ui/button";
// import Link from "next/link";
// import { signIn } from "next-auth/react";
// import { useRouter } from "next/navigation";
// import { useToast } from "@/components/ui/use-toast"


// const FormSchema = z.object({
//   UserID: z.string(),
//   Password: z.string()
//     .min(1, "password is required")
//     .min(8, "password must have at least 8 characters"),
// });

// const Signin = () => {
//   const { toast } = useToast()
//   const { data: session } = useSession();
//   const router = useRouter(); 

//   const form = useForm<z.infer<typeof FormSchema>>({
//     resolver: zodResolver(FormSchema),
//   });

//   const redirectToProfile = (role: string) => {
//     switch (role) {
//       case "Technicien":
//         router.push("/technicien");
//        //router.refresh();
//         break;
//       case "Admin":
//         router.push("/admin");
//         //router.refresh();
//         break;
//       case "RE":
//         router.push("/RE");
//       //  router.refresh();
//         break;
//       case "Superviseur":
//         router.push("/superviseur");
//        // router.refresh();
//         break;
//       default:
//         break;
       
//     }
//   };

  
//   const onSubmit = async (values: z.infer<typeof FormSchema>) => {
//     const signInData = await signIn("credentials", {
//       userID: values.UserID,
//       password: values.Password,
//       redirect: false,
//     });

//     if (signInData?.error) {
//       toast({
//         title: "Error",
//         description: "Oops! UserdID or Password is incorrect",
//         variant :"destructive"
//       })
    
//     } else if (session?.user?.role) {
//       redirectToProfile(session.user.role);
//     }
//   };

//   return (
//     <Form {...form}>
//       <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
//         <div className="space-y-2">
//           <FormField
//             control={form.control}
//             name="UserID"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>UserID</FormLabel>
//                 <Input placeholder="Enter your UserID" {...field} />
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//           <FormField
//             control={form.control}
//             name="Password"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Password</FormLabel>
//                 <Input type="password" placeholder="Enter your Password" {...field} />
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//         </div>
//         <Button className="w-full mt-6" type="submit">
//           Sign in
//         </Button>
//       </form>
//       <div className="mx-auto my-4 flex w-full items-center justify-evently before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400">
//         or
//       </div>
//       <p className="text-center text-sm text-gray-900 mt-2">
//         if you dont have an acount, please
//         <Link className="text-blue-500 hover:underline ml-2" href={"sign-up"}>
//           Sign up
//         </Link>
//       </p>
//     </Form>
//   );
// };

// export default Signin;
"use client"
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormMessage, Form } from "../ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

const FormSchema = z.object({
  UserID: z.string(),
  Password: z.string().min(1, "password is required").min(8, "password must have at least 8 characters"),
});

const Signin = () => {
  const { toast } = useToast();
  const { data: session } = useSession();
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  useEffect(() => {
    if (session) {
      redirectToProfile(session.user.role);
    }
  }, [session]);

  const redirectToProfile = (role: string) => {
    switch (role) {
      case "Technicien":
        router.push("/technicien");
        break;
      case "Admin":
        router.push("/admin");
        break;
      case "RE":
        router.push("/RE");
        break;
      case "Superviseur":
        router.push("/superviseur");
        break;
      case "SuperAdmin":
          router.push("/superAdmin");
      break;

      default:
        break;
    }
  };

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    const signInData = await signIn("credentials", {
      userID: values.UserID,
      password: values.Password,
      redirect: false,
    });

    if (signInData?.error) {
      toast({
        title: "Error",
        description: "Oops! UserdID or Password is incorrect",
        variant: "destructive",
      });
    }
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
        </div>
        <Button className="w-full mt-6" type="submit">
          Sign in
        </Button>
      </form>
      <div className="mx-auto my-4 flex w-full items-center justify-evently before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400">
        or
      </div>
      <p className="text-center text-sm text-gray-900 mt-2">
        if you dont have an acount, please
        <Link className="text-blue-500 hover:underline ml-2" href={"sign-up"}>
          Sign up
        </Link>
      </p>
    </Form>
  );
};

export default Signin;
