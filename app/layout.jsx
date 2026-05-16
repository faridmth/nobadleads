import { Manrope } from "next/font/google";
import Analytics from "./_components/Analytics";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://nobadleads.com";
const DEFAULT_TITLE = "nobadleads · Score leads from a spreadsheet";
const DEFAULT_DESCRIPTION =
  "Upload an Excel of leads, get an ICP score and three cold email openers for each, powered by website screenshots and GPT-4o.";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: DEFAULT_TITLE,
  description: DEFAULT_DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    url: "/",
    siteName: "nobadleads",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${manrope.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-background">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
