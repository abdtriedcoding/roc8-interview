"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { type ListItemProps } from "~/types";
import { Checkbox } from "~/components/ui/checkbox";
import { toggleInterest } from "~/app/actions/toggleInterest";

export function ListItem({ id, name, isChecked }: ListItemProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleToggleInterest = async (categoryId: number) => {
    setIsLoading(true);
    await toggleInterest(categoryId);
    setIsLoading(false);
    router.refresh();
  };

  return (
    <div className="flex items-center space-x-2">
      {isLoading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <Checkbox
          checked={isChecked}
          onCheckedChange={() => handleToggleInterest(id)}
        />
      )}
      <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
        {name}
      </label>
    </div>
  );
}
