"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toggleInterest } from "~/actions";
import { Checkbox } from "~/components/ui/checkbox";
import { Loader } from "lucide-react";

interface ItemProps {
  id: number;
  name: string;
  isInterested: boolean;
}

export function ListItem({ id, name, isInterested }: ItemProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleToggleInterest = async (id: number) => {
    setIsLoading(true);
    await toggleInterest(id);
    setIsLoading(false);
    router.refresh();
  };

  return (
    <div className="flex items-center space-x-2">
      {isLoading ? (
        <Loader className="h-4 w-4 animate-spin" />
      ) : (
        <Checkbox
          checked={isInterested}
          onCheckedChange={() => handleToggleInterest(id)}
          id="terms"
        />
      )}
      <label
        htmlFor="terms"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {name}
      </label>
    </div>
  );
}
