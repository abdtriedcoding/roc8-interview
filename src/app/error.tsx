"use client";

import Image from "next/image";
import { useEffect } from "react";
import { Button } from "~/components/ui/button";
import { useToast } from "~/components/ui/use-toast";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { toast } = useToast();

  useEffect(() => {
    toast({
      variant: "destructive",
      title: error.message,
    });
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center space-y-4">
      <Image src="/error.png" priority height="300" width="300" alt="Error" />
      <h2 className="text-xl font-medium">Something went wrong!</h2>
      <Button
        size={"lg"}
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </Button>
    </div>
  );
}
