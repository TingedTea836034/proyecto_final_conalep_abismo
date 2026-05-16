
import "./globals.css";
 

export default function RootLayout({ children }) {
  return (
    <html
      lang="es"
      
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
