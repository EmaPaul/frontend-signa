import { Radio_Canada } from "next/font/google";
import "./globals.css";
import { Navbar } from "./components/navegacion/Navbar";


const radio_canada = Radio_Canada({ subsets: ["vietnamese"] });

export const metadata= {
  title:"Signa",
  description:"Prueba tecnica de full stack"
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="description" content={metadata.description} />
      </head>
      <body
       className={radio_canada.className}
       
      >
        <Navbar/>
        {children}
      </body>
    </html>
  );
}
