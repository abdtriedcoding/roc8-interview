"use client";

import { type z } from "zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { verifyOtp } from "~/app/actions/auth";
import { Button } from "~/components/ui/button";
import { useToast } from "~/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { otpVerifyFormSchema } from "~/lib/validation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "~/components/ui/input-otp";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

export function OTPVerification({
  encryptedToken,
  email,
}: {
  encryptedToken: string;
  email: string;
}) {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof otpVerifyFormSchema>>({
    resolver: zodResolver(otpVerifyFormSchema),
    defaultValues: {
      pin: "",
    },
  });

  async function onSubmit(data: z.infer<typeof otpVerifyFormSchema>) {
    const res = await verifyOtp(data, encryptedToken, email);
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
          Verify your email
        </CardTitle>
        <CardDescription className="mx-auto max-w-sm text-center text-[16px] text-black">
          Enter the 8-digit code you have received on{" "}
          <strong>{email?.substring(0, 3)}***@gmail.com</strong>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col">
        <div className="mx-auto">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="pin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Code</FormLabel>
                    <FormControl>
                      <InputOTP maxLength={8} {...field}>
                        <InputOTPGroup className="space-x-4">
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                          <InputOTPSlot index={2} />
                          <InputOTPSlot index={3} />
                          <InputOTPSlot index={4} />
                          <InputOTPSlot index={5} />
                          <InputOTPSlot index={6} />
                          <InputOTPSlot index={7} />
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                disabled={isSubmitting}
                className="mx-auto mt-10 w-full max-w-xl"
                type="submit"
              >
                <div className="flex items-center space-x-3">
                  {isSubmitting && <Loader2 className="h-6 w-6 animate-spin" />}
                  <p className="text-[16px] font-medium">VERIFY</p>
                </div>
              </Button>
            </form>
          </Form>
        </div>
      </CardContent>
    </>
  );
}
