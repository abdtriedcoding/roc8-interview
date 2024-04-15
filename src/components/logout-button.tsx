"use client";

import { logout } from "~/app/actions/auth";
import { Button } from "~/components/ui/button";

export default function LogoutButton() {
  return (
    <Button
      className="h-9"
      onClick={async () => {
        await logout();
      }}
    >
      Logout
    </Button>
  );
}
