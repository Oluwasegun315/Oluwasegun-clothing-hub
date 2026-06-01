"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { toast } from "sonner";

import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";

export function AccountSignOut() {
  const router = useRouter();

  const onLogout = async () => {
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signOut();
      if (error) {
        toast.error(error.message);
        return;
      }
      toast.success("Signed out");
      router.push("/");
      router.refresh();
    } catch {
      toast.error("Could not sign out");
    }
  };

  return (
    <Button type="button" variant="outline" className="rounded-full" onClick={onLogout}>
      <LogOut className="mr-2 size-4" />
      Sign out
    </Button>
  );
}
