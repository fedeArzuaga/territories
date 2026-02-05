import type { Metadata } from "next";
import { Nunito_Sans } from "next/font/google";
import { SpeedInsights } from '@vercel/speed-insights/next';

import { TerritoriesSessionProvider } from "@/providers/TerritoriesSessionProvider";
import "leaflet/dist/leaflet.css";
import "./globals.css";

const nunitoSans = Nunito_Sans({
  variable: "--font-nunito-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Territorios Los Bulevares",
  description: "App creada para administrar el estado de los territorios, ya sea su frecuencia de trabajado, cuándo fue la última vez que se trabajó, y demás datos relevantes.",
  icons: {
    icon: '/assets/logo.svg'
  },
  manifest: '/manifest.json'
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className={`${nunitoSans.variable}`} lang="es">
      <head>
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body
        className={`${nunitoSans.variable} antialiased`}
      >
        <div id="main-map-container">
          <TerritoriesSessionProvider>
            {children}
          </TerritoriesSessionProvider>
          <SpeedInsights />
        </div>
      </body>
    </html>
  );
}
