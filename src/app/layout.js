import "./styles/globals.css";
import { Providers } from "./Providers";
import Footer from "./container/Footer";
import Checkpath from "./utils/checkpath";

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <body>
        <Checkpath />
        <Providers>{children}</Providers>
        <Footer />
      </body>
    </html>
  );
}
