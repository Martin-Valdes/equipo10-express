import type { Metadata } from "next";
import { DM_Serif_Text, Poppins } from "next/font/google";
import "../styles/globals.css";

const dmSerifText = DM_Serif_Text({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400"],
});

const poppins = Poppins({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "easyEmail – Creá y enviá emails con IA",
  description: "Generá correos profesionales en segundos con inteligencia artificial.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${dmSerifText.variable} ${poppins.variable}`}>
        {children}
      </body>
    </html>
  );
}
