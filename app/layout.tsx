import type { Metadata } from "next";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

export const metadata: Metadata = {
  title: "India at 80 — What Does Freedom Look Like?",
  description:
    "An interactive digital exhibition marking 80 years of Indian independence — history, culture, progress, dissent, contradiction, and the next 80 years, told as one continuous scroll.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full bg-midnight text-ivory">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
