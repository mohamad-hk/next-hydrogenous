import "./styles/globals.css";
import { Providers } from "./Providers";
import Header from "./container/Header";
import Footer from "./container/Footer";

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <body>
        <Header />
        <Providers>{children}</Providers>
        <Footer />
      </body>
    </html>
  );
}
