import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { ListItem } from "./_components/list-item";

export default async function HomePage() {
  return (
    <Card className="mx-auto max-w-lg pb-10">
      <CardHeader>
        <CardTitle className="pb-2 text-center text-[32px] font-semibold">
          Please mark your interests!
        </CardTitle>
        <CardDescription className="mx-auto justify-center text-black">
          We will keep you notified.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <h1 className="text-[20px] font-medium">My saved interests!</h1>
        <ListItem />
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
}
