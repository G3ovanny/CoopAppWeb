import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import "./globals.css";
import { AppTheme } from "./theme/AppTheme";
import StoreProvider from "./StoreProvider";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cooperativa App",
  description: "Módulo de créditos de una cooperativa",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <StoreProvider>
          <AppRouterCacheProvider >
            <AppTheme>
              {children}
            </AppTheme>
          </AppRouterCacheProvider>
        </StoreProvider>
      </body>
      {/* <body className={inter.className}>{children}</body> */}
    </html>
  );
}
