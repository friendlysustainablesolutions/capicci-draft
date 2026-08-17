import ClientLayout from "@/client-layout";

import "./globals.css";

export const metadata = {
  title: "CAPICCI – Events & Happiness | Codegrid",
  description: "MWT by Codegrid | March 2026",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
