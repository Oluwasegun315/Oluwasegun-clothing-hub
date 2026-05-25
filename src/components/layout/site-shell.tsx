import { StoreNavbar } from "@/components/layout/store-navbar";
import { StoreFooter } from "@/components/layout/store-footer";

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-orange-50/40">
      <StoreNavbar />
      <main className="flex-1">{children}</main>
      <StoreFooter />
    </div>
  );
}
