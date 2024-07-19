import { Card } from "~/components/ui/card";
import { CreateAccount } from "../_components/create-account";
import { OTPVerification } from "../_components/otp-verfication";

export default function SignupPage({
  searchParams,
}: {
  searchParams: Record<string, string | undefined>;
}) {
  const { token, email } = searchParams;

  return (
    <Card className="mx-auto max-w-lg pb-10">
      {token ? (
        <OTPVerification encryptedToken={token} email={email!} />
      ) : (
        <CreateAccount />
      )}
    </Card>
  );
}
