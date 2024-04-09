"use client";

import { z } from "zod";
import Link from "next/link";
import { db } from "~/server/db";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { encryptToken, generateToken } from "~/lib/utils";

import {
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";

const formSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Name must be at least 2 characters.",
    })
    .max(50),
  email: z.string().email({
    message: "Invalid email format.",
  }),
  password: z
    .string()
    .min(6, {
      message: "Password must be at least 6 characters.",
    })
    .max(50),
});

export function CreateAccount() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const router = useRouter();
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      // const user = await db.user.create({
      //   data: {
      //     ...values,
      //   },
      // });
      const token = generateToken();
      const encryptedToken = encryptToken(token);
      router.push(`/sign-up?token=${encryptedToken}`);
    } catch (error) {
      console.error("Error creating user");
    }
  }

  return (
    <>
      <CardHeader>
        <CardTitle className="text-center text-[32px] font-semibold">
          Create your account
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter" {...field} />
                  </FormControl>
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
                  <FormControl>
                    <Input placeholder="Enter" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full" type="submit">
              <p className="text-[16px] font-medium">CREATE ACCOUNT</p>
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        <p className="mx-auto text-[16px]">
          Have an Account?{" "}
          <span className="text-[16px] font-medium">
            <Link href={"/login"}>LOGIN</Link>
          </span>
        </p>
      </CardFooter>
    </>
  );
}
