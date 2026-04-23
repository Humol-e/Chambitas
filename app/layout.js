import "./globals.css";

export const metadata = {
  title: "Chambitas",
  description: "La red local y segura de micro-trabajos impulsada por estudiantes.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
