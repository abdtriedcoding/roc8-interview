import Link from "next/link";
import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";
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

interface FormFieldProps {
  label: string;
  id: string;
  type: string;
  placeholder: string;
}

const Page = () => {
  const token = true;

  return (
    <Card className="mx-auto max-w-lg pb-10">
      {token ? <TokenVerificationContent /> : <AccountCreationContent />}
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

const AccountCreationContent = () => {
  return (
    <>
      <CardHeader>
        <CardTitle className="text-center text-[32px] font-semibold">
          Create your account
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <FormField label="Name" id="name" type="text" placeholder="Enter" />
        <FormField label="Email" id="email" type="email" placeholder="Enter" />
        <FormField
          label="Password"
          id="password"
          type="password"
          placeholder="Enter"
        />
      </CardContent>
      <CardFooter className="flex flex-col space-y-6">
        <Button asChild className="w-full">
          <p role="button" className="text-[16px] font-medium">
            CREATE ACCOUNT
          </p>
        </Button>
        <p className="text-[16px]">
          Have an Account?{" "}
          <span className="text-[16px] font-medium">
            <Link href={"/"}>LOGIN</Link>
          </span>
        </p>
      </CardFooter>
    </>
  );
};

const FormField: React.FC<FormFieldProps> = ({
  label,
  id,
  type,
  placeholder,
}) => {
  return (
    <div className="space-y-1">
      <Label className="text-[16px]" htmlFor={id}>
        {label}
      </Label>
      <Input id={id} type={type} placeholder={placeholder} />
    </div>
  );
};

export default Page;
