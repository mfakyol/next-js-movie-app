import "@styles/🌎.scss";
import "../lib/StringObjectExpander";
import Navbar from "_components/Navbar";
import { ThemeProvider } from "contexts/ThemeContext";
import { TranslationContextProvider } from "contexts/translationContext";

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <TranslationContextProvider>
        <Navbar />
        <Component {...pageProps} />
      </TranslationContextProvider>
    </ThemeProvider>
  );
}

export default MyApp;
