import { useRouter } from "next/router";
import translations from "../translations";
import { useContext, createContext, useCallback } from "react";

const TranslationContext = createContext();

const useTranslation = () => {
  const context = useContext(TranslationContext);

  if (!context) {
    throw new Error("useTranslation must be used within a TranslationContextProvider");
  }
  return context;
};

export default useTranslation;

export const TranslationContextProvider = ({ children }) => {
  const router = useRouter();

  const t = useCallback((key) => translations?.[key]?.[router.locale] || key, [router.locale]);

  return <TranslationContext.Provider value={t}>{children}</TranslationContext.Provider>;
};
