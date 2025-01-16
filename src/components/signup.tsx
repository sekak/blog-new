// "use client";
// import * as Form from "@radix-ui/react-form";
// import { Button } from "@radix-ui/themes";
// import { Github, LogIn } from "lucide-react";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";
// import LoadingAnimation from "./loadinganimation";
// import { createClient } from '@/utils/supabase/server'

// async export default function FormSignup() {
//   const [loading, setLoading] = useState(true);
//     const supabase = await createClient();
//   useEffect(() => {
//     const getUser = async () => {
//       const {
//         data: { user },
//       } = await supabase.auth.getUser();
//       if (user) {
//         return router.push("/");
//       }
//       setLoading(false);
//     };
//     getUser();
//   }, []);
//   const router = useRouter();

//   if (loading) return <LoadingAnimation />;

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const email = e.target.email.value;
//     const password = e.target.password.value;
//     const fullname = e.target.fullname.value;

//     console.log("User input:", email, password, fullname);

//     try {
//       // Step 1: Sign up the user
//       const { data: signUpData, error: signUpError } =
//         await supabase.auth.signUp({
//           email,
//           password,
//           options: {
//             emailRedirectTo: process.env.REDIRECT_URL, // Adjust as needed for your production environment
//             data: {
//               fullname,
//             },
//           },
//         });

//       if (signUpError) throw signUpError;

//       const user = signUpData?.user;
//       console.log("Signed-up user:", user);

//       router.push("/login");
//     } catch (error) {
//       console.error("Error during sign-up:", error.message);

//       // Add Toastify or other notification logic here for user feedback
//     }
//   };

//   return (
//     <div className="relative mx-auto max-w-md py-28 px-3">
//       <div className="border rounded-lg flex flex-col p-8 relative overflow-hidden">
//         <div className="mb-5">
//           <h1 className="font-bold text-2xl mb-1">Login</h1>
//           <p className="text-muted-foreground text-sm">
//             Enter your email and password to access your account
//           </p>
//         </div>
//         <div className="w-full flex justify-center items-center gap-4">
//           <Button
//             variant="surface"
//             className="flex-1 text-foreground"
//             color="gray"
//             size={"3"}
//           >
//             <Github className="h-4 w-4" />
//             GitHub
//           </Button>
//           <Button
//             className="flex-1 text-foreground"
//             variant="surface"
//             color="gray"
//             size={"3"}
//           >
//             <LogIn className="h-4 w-4" />
//             Google
//           </Button>
//         </div>
//         <div className="relative max-h-4 flex items-center justify-center my-5">
//           <div className="border-b-[.5px] w-full z-0 absolute inset " />
//           <span className="text-muted-foreground bg-background z-10 text-[12px] text-center px-2">
//             OR SIGN UP WITH EMAIL
//           </span>
//         </div>
//         <Form.Root className="flex flex-col gap-6" onSubmit={handleSubmit}>
//           <Form.Field name="fullname" className="flex flex-col gap-3">
//             <Form.Label className="text-sm">Full name</Form.Label>
//             <Form.Control
//               type="text"
//               placeholder="Enter your full name"
//               className="border bg-transparent text-sm p-[10px] rounded-lg"
//             />
//             <Form.Message match="valueMissing">
//               Please enter your full name
//             </Form.Message>
//           </Form.Field>
//           <Form.Field name="email" className="flex flex-col gap-3">
//             <Form.Label className="text-sm">Email</Form.Label>
//             <Form.Control
//               type="text"
//               placeholder="med@example.com"
//               className="border bg-transparent text-sm p-[10px] rounded-lg"
//             />
//             <Form.Message match="valueMissing">
//               Please enter your email
//             </Form.Message>
//             <Form.Message match="typeMismatch">
//               Please enter a valid email
//             </Form.Message>
//           </Form.Field>
//           <Form.Field name="coverImage" className="flex flex-col gap-3">
//             <Form.Label className="text-sm">Password</Form.Label>
//             <Form.Control
//               type="password"
//               name="password"
//               placeholder="Enter Your Password"
//               className="border bg-transparent text-sm p-[10px] rounded-lg"
//             />
//             <Form.Message match="valueMissing">
//               Please enter your password
//             </Form.Message>
//           </Form.Field>
//           <Form.Submit className="flex text-sm justify-center items-center p-3 rounded-lg gap-2 bg-black dark:bg-white dark:text-black text-white">
//             <LogIn className="h-4 w-4" />
//             Login
//           </Form.Submit>
//         </Form.Root>
//         <div className="mt-4 flex justify-center">
//           <p className="text-muted-foreground text-sm">
//             Already have an account?{"  "}
//             <Link href="/signup" className="text-primary hover:underline">
//               Sign up
//             </Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }
