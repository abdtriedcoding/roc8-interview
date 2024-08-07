"use client";

import Link from "next/link";
import { type z } from "zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { signup } from "~/app/actions/auth";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "~/components/ui/use-toast";
import { registerFormSchema } from "~/lib/validation";
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

export function CreateAccount() {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof registerFormSchema>) {
    const res = await signup(values);
    if (res?.error) {
      toast({
        variant: "destructive",
        title: res.error,
      });
    }
  }

  const { isSubmitting } = form.formState;

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
                    <Input
                      disabled={isSubmitting}
                      placeholder="Enter"
                      {...field}
                    />
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
                    <Input
                      disabled={isSubmitting}
                      placeholder="Enter"
                      {...field}
                    />
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
                    <Input
                      disabled={isSubmitting}
                      type="password"
                      placeholder="Enter"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={isSubmitting} className="w-full" type="submit">
              <div className="flex items-center space-x-3">
                {isSubmitting && <Loader2 className="h-6 w-6 animate-spin" />}
                <p className="text-[16px] font-medium">CREATE ACCOUNT</p>
              </div>
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
