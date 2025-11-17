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
  return children;
}

export default RootLayout;