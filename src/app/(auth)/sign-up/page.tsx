import { Button } from "~/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "~/components/ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "~/components/ui/input-otp";
import { CreateAccount } from "../_components/create-account";

const Page = () => {
  const token = false;

  return (
    <Card className="mx-auto max-w-lg pb-10">
      {token ? <TokenVerificationContent /> : <CreateAccount />}
    </Card>
  );
};

const TokenVerificationContent = () => {
  return (
    <>
      <CardHeader>
        <CardTitle className="text-center text-[32px] font-semibold">
          Verify your email
        </CardTitle>
        <CardDescription className="mx-auto max-w-sm text-center text-[16px] text-black">
          Enter the 8-digit code you have received on swa***@gmail.com
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col">
        <div className="mx-auto">
          <h1>Code</h1>
          <InputOTP maxLength={8}>
            <InputOTPGroup className="space-x-4">
              {[...Array(8)].map((_, index) => (
                <InputOTPSlot key={index} index={index} />
              ))}
            </InputOTPGroup>
          </InputOTP>
        </div>
      </CardContent>
      <CardFooter className="mx-auto max-w-[456px]">
        <Button asChild className="mx-auto w-full max-w-xl">
          <p role="button" className="text-[16px] font-medium">
            VERIFY
          </p>
        </Button>
      </CardFooter>
    </>
  );
};

export default Page;
