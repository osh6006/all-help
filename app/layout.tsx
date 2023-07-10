import { Inter } from "next/font/google";

import AuthContext from "./context/AuthContext";
import ToasterContext from "./context/ToasterContext";

import "./globals.css";
import ActiveStatus from "./components/ActiveStatus";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "All Help",
  description: "모든 고객들을 위한 모든 서비스 센터 들을 위한 사이트",
  Author: "ohs6006@gmail.com",
  openGraph: {
    title: "All Help",
    description: "모든 고객들을 위한 모든 서비스 센터 들을 위한 사이트",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthContext>
          <ToasterContext />
          <ActiveStatus />
          {children}
        </AuthContext>
      </body>
    </html>
  );
}
