import "./styles/globals.css";
import { heroui } from "./Providers";
export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <body>
        <heroui>{children}</heroui>
      </body>
    </html>
  );
}
