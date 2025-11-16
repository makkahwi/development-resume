import type { Metadata } from "next";
import "./globals.css";
import Providers from "./providers";

export const metadata: Metadata = {
  title: "Suhaib Ahmad – Resume Website",
  description: "Senior full-stack developer, technical advisor, mentor and more.",
};

const RootLayout = ({
  children,
}: {
  children: React.ReactNode;
}) =>  {
  return (
    <html>
      <body className="bg-light">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}

export default RootLayout;