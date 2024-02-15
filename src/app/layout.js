import { Analytics } from "@vercel/analytics/react";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export const metadata = {
  title: "Secret Shopper - Buttermilk Kitchen",
  description: "Secret Shopper survey app for Buttermilk Kitchen Restaurant",
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    type: "website",
    url: "https://buttermilk-shopper.vercel.app",
    title: "Secret Shopper - Buttermilk Kitchen",
    description:
      "Secret Shopper survey app for Buttermilk Kitchen Restaurant",
    siteName: "Secret Shopper - Buttermilk Kitchen",
    images: [
      {
        url: "/BK_Logo_400.jpg",
      },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={montserrat.variable}>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
