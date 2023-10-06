import { Footer, NavBar } from "@marketing/shared/components";
import { UserContextProvider } from "@saas/auth/lib";
import { PropsWithChildren } from "react";

export default function MarketingLayout({ children }: PropsWithChildren) {
  return (
    <UserContextProvider initialUser={null}>
      <NavBar />
      <main className="min-h-screen pt-32">{children}</main>
      <Footer />
    </UserContextProvider>
  );
}
