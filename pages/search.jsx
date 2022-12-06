import SearchView from "@views/SearchView";
import useTranslation from "contexts/translationContext";
import Head from "next/head";

function SearchPage() {
  const t = useTranslation();
  return (
    <>
      <Head>
        <title>{`${t("search").toCapitalCase()} | Movie App`}</title>
      </Head>
      <SearchView />
    </>
  );
}

export default SearchPage;
