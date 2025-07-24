import "@/styles/globals.css";
import "@/styles/spoilers.css";
import "@/styles/nested-lists.css";
import "@/styles/collapsible-code.css";
import "@/styles/syntax-highlighting.css";
import type { AppProps } from "next/app";
import { CssBaseline } from "@mui/material";
import { ColorModeProvider } from "@/components/ColorModeContext";
import Header from "@/components/Header";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ColorModeProvider>
      <CssBaseline />
      <Header />
      <Component {...pageProps} />
    </ColorModeProvider>
  );
}
