import ClientLayout from "@/client-layout";

import "./globals.css";

export const metadata = {
  title: "CAPICCI - Events & Happiness",
  description: "CAPICCI - Events & Happiness",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-PT">
      <head>
        {/* Runs before first paint so a repeat visit never flashes the intro
            overlay. The server always renders the preloader (it can't read
            session storage), so this hides it via CSS instead of changing the
            markup, which would break hydration. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{if(sessionStorage.getItem('capicci-preloader-seen'))document.documentElement.dataset.preloaderSeen='1'}catch(e){}",
          }}
        />
      </head>
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
