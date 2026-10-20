import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { MotionProvider } from "@/components/providers/motion-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://wowvisual.my"),
  title: { default: "WOW VISUAL — Video Production Studio", template: "%s · WOW VISUAL" },
  description:
    "Commercials, corporate films, events and social content for brands that want to be remembered.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-MY" className={`${inter.variable} antialiased`} suppressHydrationWarning>
      <body>
        {/* Content must stay readable if JS fails (§9) */}
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important;filter:none!important}`}</style>
        </noscript>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <MotionProvider>{children}</MotionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
