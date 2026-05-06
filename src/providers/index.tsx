"use client";
import React from "react";
import { ReduxProvider } from "./ReduxProvider";
// import { I18nProvider } from "../lib/i18n/i18n-provider";
// import { ThemeProvider } from "../lib/contexts/themeContext";

interface ProvidersProps {
  children: React.ReactNode;
}

const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return (
    // <I18nProvider>
    <ReduxProvider>
      {/* <ThemeProvider> */}
      {children}
      {/* </ThemeProvider> */}
    </ReduxProvider>
    // </I18nProvider>
  );
};

export { Providers };
