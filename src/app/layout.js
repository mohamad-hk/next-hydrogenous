import "./styles/globals.css";
import { Providers } from "./Providers";
import Checkpath from "./utils/checkpath";
import CheckpathFooter from "./utils/checkpathFooter";

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <body>
        <Checkpath />
        <Providers>{children}</Providers>
        <CheckpathFooter />
      </body>
    </html>
  );
}
