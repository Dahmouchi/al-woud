import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Al Woud | Salle de Fêtes & Mariages à Salé, Maroc",
  description:
    "Célébrez vos moments inoubliables à Al Woud. Une salle de fêtes prestigieuse à Salé pour mariages, anniversaires et événements exclusifs. Profitez d'un cadre enchanteur avec visite virtuelle 3D et service sur mesure.",
  keywords: [
    "Al Woud",
    "Salle de fêtes Salé",
    "Mariage Salé Maroc",
    "Organisation mariage Salé",
    "Salle de réception Salé",
    "Visite virtuelle 3D salle mariage",
  ],
  openGraph: {
    title: "Al Woud | Salle de Fêtes & Mariages à Salé",
    description:
      "Un cadre d'exception pour vos mariages et événements à Salé. Découvrez notre espace prestigieux.",
    url: "https://alwoud.com", // Remplacez par votre domaine réel
    siteName: "Al Woud",
    images: [
      {
        url: "/optimized/9.webp",
        width: 1200,
        height: 630,
        alt: "Intérieur de la Salle Al Woud",
      },
    ],
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Al Woud | Salle de Fêtes & Mariages à Salé",
    description: "Votre espace privilégié pour des événements inoubliables à Salé.",
    images: ["/optimized/9.webp"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
