import "./styles/globals.css";
import { Providers } from "./Providers";
import Footer from "./container/Footer";
import { AuthProvider } from "./context/AuthContext";
import Header from "./container/Header";
import { ShipmentProvider } from "./context/ShipmentContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 

export const metadata = {
  title: "هیدروژنوس",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
      <body className="bg-[#F5F7FA] dark:bg-[#313747] dark:text-white">
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <AuthProvider>
          <ShipmentProvider>
            <Header />
            <Providers>{children}</Providers>
            <ToastContainer 
              position="top-right" 
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={true}
            />
            <Footer />
          </ShipmentProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

const themeScript = `
  (function() {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (prefersDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  })();
`;
