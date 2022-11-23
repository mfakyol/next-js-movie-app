import "@styles/🌎.scss";
import { TranslationContextProvider } from "contexts/translationContext";
import Navbar from "_components/Navbar";
import StringObjectExpander from '../lib/StringObjectExpander'

function MyApp({ Component, pageProps }) {
  
  return (
    <TranslationContextProvider>
      <Navbar />
      <Component {...pageProps} />
    </TranslationContextProvider>
  );
}

export default MyApp;
