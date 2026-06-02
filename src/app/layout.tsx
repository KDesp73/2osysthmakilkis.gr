import type { Metadata } from "next";
import "./globals.css";
import Layout from "@/components/local/Layout";
import { Analytics } from "@vercel/analytics/next";
import Seo from "@/components/local/Seo";
import { DM_Sans, Source_Serif_4 } from "next/font/google";
import { ConfirmProvider } from "@/components/local/ConfirmContext";
import { Suspense } from "react";
import { ToastProvider } from "@/components/local/ToastContext";

const sans = DM_Sans({
  subsets: ["latin", "latin-ext"],
  variable: "--font-body",
  display: "swap",
});

const display = Source_Serif_4({
  subsets: ["latin", "greek"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "2ο Σύστημα Προσκόπων Κιλκίς",
  description: "Η επίσημη ιστοσελίδα του 2ου Συστήματος Προσκόπων Κιλκίς",
  other: {
    "google-site-verification": "awtTRbjKmp55AeVdkTQtKScmYyLLBjuyB1o97M7oPEw",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="el" className={`${sans.variable} ${display.variable}`}>
      <Seo
        title={metadata.title as string}
        description={metadata.description as string}
        image="/logo.jpg"
        siteName={metadata.title as string}
        canonicalUrl="https://2osysthmakilkis.gr"
      />
      <body className="min-h-screen">
        <Suspense>
          <ConfirmProvider>
            <ToastProvider>
              <Layout>
                {children}
                <Analytics />
              </Layout>
            </ToastProvider>
          </ConfirmProvider>
        </Suspense>
      </body>
    </html>
  );
}
