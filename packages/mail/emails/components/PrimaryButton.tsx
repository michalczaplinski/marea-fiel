import { Button } from "@react-email/components";
import { PropsWithChildren } from "react";

export default function PrimaryButton({
  href,
  children,
}: PropsWithChildren<{
  href: string;
}>) {
  return (
    <Button
      pX={20}
      pY={12}
      href={href}
      className="bg-primary text-primary-foreground rounded-md"
    >
      {children}
    </Button>
  );
}
