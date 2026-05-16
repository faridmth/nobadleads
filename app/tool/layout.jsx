import { Toaster } from "sonner";

const TITLE = "Score your leads · nobadleads";
const DESCRIPTION =
  "Drop a spreadsheet of prospects. AI scores every website against your ICP and writes three cold openers per lead.";

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/tool" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/tool",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

export default function ToolLayout({ children }) {
  return (
    <>
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
    </>
  );
}
