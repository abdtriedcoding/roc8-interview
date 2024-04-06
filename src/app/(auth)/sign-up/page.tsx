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
import Link from "next/link";

const Page = () => {
  return (
    <>
      <Card className="mx-auto max-w-lg pb-10">
        <CardHeader>
          <CardTitle className="text-center text-[32px] font-semibold">
            Create your account
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1">
            <Label className="text-[16px]" htmlFor="name">
              Name
            </Label>
            <Input id="name" placeholder="Enter" />
          </div>
          <div className="space-y-1">
            <Label className="text-[16px]" htmlFor="email">
              Email
            </Label>
            <Input id="email" type="email" placeholder="Enter" />
          </div>
          <div className="space-y-1">
            <Label className="text-[16px]" htmlFor="password">
              Password
            </Label>
            <Input id="password" type="password" placeholder="Enter" />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-6">
          <Button asChild className="w-full">
            <p role="button" className="text-[16px] font-medium">CREATE ACCOUNT</p>
          </Button>
          <p className="text-[16px]">
            Have an Account?{" "}
            <span className="text-[16px] font-medium">
              <Link href={"/"}>LOGIN</Link>
            </span>
          </p>
        </CardFooter>
      </Card>
    </>
  );
};

export default Page;
