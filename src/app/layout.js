import "./styles/globals.css";
import { Providers } from "./Providers";
import Checkpath from "./utils/checkpath";
import Footer from "./container/Footer";

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <body>
        <Checkpath />
        <Providers>{children}</Providers>
        <Footer/>
      </body>
    </html>
  );
}
