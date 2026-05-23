
import "./globals.css";
import Navbar from "../../componentes/nav.jsx";

export default function RootLayout({ children }) {
  return (
    <html
      lang="es"
      
    >
      <Navbar />
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
