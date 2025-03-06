import "./styles/globals.css";
import { Providers } from "./Providers";
import Footer from "./container/Footer";
import { AuthProvider } from "./context/AuthContext";
import Header from "./container/Header";

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <body>
        <AuthProvider>
          <Header />
          <Providers>{children}</Providers>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
