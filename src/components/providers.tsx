"use client";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
import theme from "../../utils/theme";

type Props = {
  children: ReactNode;
};

export default function Providers({ children }: Props) {
  return (
  <SessionProvider>
    
      <ThemeProvider theme={theme}>{children}
      
           <CssBaseline />
      
         </ThemeProvider>  
      
      </SessionProvider>

  );
}
