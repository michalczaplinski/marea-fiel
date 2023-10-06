import {
  Container,
  Font,
  Head,
  Html,
  Section,
  Tailwind,
} from "@react-email/components";
import { PropsWithChildren } from "react";
import { Logo } from "./Logo";

const tailwindConfig = require("tailwind-config");

export default function Wrapper({ children }: PropsWithChildren) {
  return (
    <Html lang="en">
      <Head>
        <Font
          fontFamily="Inter"
          fallbackFontFamily="Arial"
          fontWeight={400}
          fontStyle="normal"
        />
      </Head>
      <Tailwind config={tailwindConfig}>
        <Section className="p-1">
          <Container className="border-border bg-card text-card-foreground rounded-lg border border-solid p-6">
            <Logo />
            {children}
          </Container>
        </Section>
      </Tailwind>
    </Html>
  );
}
