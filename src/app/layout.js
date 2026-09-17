import ClientLayout from "@/client-layout";

import "./globals.css";

export const metadata = {
  title: "CAPICCI - Events & Happiness",
  description: "CAPICCI - Events & Happiness",
};

export default function RootLayout({ children }) {
  return (
    // suppressHydrationWarning is scoped to this element's own attributes:
    // the pre-paint script below and LanguageProvider both write to <html>
    // before/after hydration, which React would otherwise report as a
    // mismatch. Children are still checked normally.
    <html lang="pt-PT" suppressHydrationWarning>
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
