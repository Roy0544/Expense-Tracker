import { Anton, Roboto_Mono, Open_Sans, Montserrat } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import StoreProvider from "./storeProvider";

const anton = Anton({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-anton",
});
const roboto = Roboto_Mono({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-roboto-mono",
});
const opensans = Open_Sans({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-open-sans",
});
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-montserrat",
});
export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={` ${anton.variable}  ${roboto.variable}  ${opensans.variable}  ${montserrat.variable}`}
    >
      <body className="p-2 ">
        <StoreProvider>
          <Navbar />
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}
