import { extendTheme } from "@chakra-ui/react";
import { Poppins } from "next/font/google";

const poppins = Poppins({ subsets: ["latin"], weight: "500" });

const theme = extendTheme({
  breakpoints: {
    sm: "300px",
    md: "768px",
    lg: "960px",
    xl: "1200px",
    "2xl": "1536px",
  },
  fonts: {
    body: poppins.style.fontFamily,
  },
});

export default theme;
