import ClientLayout from "@/client-layout";

import "./globals.css";

export const metadata = {
  title: "CAPICCI - Events & Happiness",
  description: "CAPICCI - Events & Happiness",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-PT">
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
