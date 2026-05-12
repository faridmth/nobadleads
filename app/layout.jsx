import { Manrope } from "next/font/google";
import { Toaster } from "sonner";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata = {
  title: "nobadleads · Score leads from a spreadsheet",
  description:
    "Upload an Excel of leads, get an ICP score and three cold email openers for each, powered by website screenshots and GPT-4o.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${manrope.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-background">
        {children}
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              fontFamily: "var(--font-manrope)",
              fontSize: "13px",
            },
          }}
        />
      </body>
      <GoogleAnalytics gaId="G-B7LPKJK516" />
    </html>
  );
}
