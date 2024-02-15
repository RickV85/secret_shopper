import { Analytics } from '@vercel/analytics/react';
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({ subsets: ["latin"], variable: "--font-montserrat" });

export const metadata = {
  title: "Buttermilk Kitchen - Secret Shopper",
  description: "Secret Shopper form for Buttermilk Kitchen Restaurant",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={montserrat.variable}>
      <body>{children}</body>
      <Analytics />
    </html>
  );
}
